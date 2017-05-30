import ActionTypes from '../actions/ActionTypes.js';
import GameState from '../model/GameState.js';
import { createDeck, copyCards, copyShuffle, Facing } from '../model/WarCards.js';
import { createPlayers, copyPlayers } from '../model/WarPlayer.js';

/**
 * This is the main reducer as well as the game controller for war.
 *  - This reducer simultaneously removes the cards from all players
 *    down stacks and into their piles during battle and war.
 *  - Before a battle, players are added to a 'survivors' array.
 *  - Players who run out of cards, either after a battle or during a war,
 *    are removed from survivors and are dead. 
 *  - Players who tie during battle go to war and are added to the 'warMongers' 
 *    array.
 *  - Players with the high cards after each round are added the 'warMongers'
 *    array.
 *  - If there is one person left in warMongers then they win the round.
 *  - If there is more than one person left in warMongers then a war is 
 *    started between those players until only one is left or they run out.
 *  - The last person with cards wins the game.
 *  - If all surviving players run of cards during a way then no one wins
 *    and it is a tie.
 *
 * VARIANT:
 * - In this variant a player who runs out of cards during war loses.
 * - If all players run out of cards during war, then it falls back to the
 *   remaining players war/battle cards. If there are no remaining players,
 *   then the game ends in a tie since no one won. 
 *
 * https://en.wikipedia.org/wiki/War_(card_game)
 */

// TODO: create a game model for some of these objects.
export const MIN_PLAYERS = 2;
export const MAX_PLAYERS = 4;

const initialState = {
	gameState: GameState.START,
	deck: createDeck(),			
	players: [],					// array of player objects
	survivors: [],					// array of player indexes who are still in the game
	warMongers: [],					// array of player indexes with highest cards each round
	roundWinner: -1,
	numberOfPlayers: MIN_PLAYERS
};

/**
 * Starts a game by shuffling the deck and creating the players.
 *
 * NOTE: This is not a pure function since we use a random number
 *       generator in copyShuffle, but I feel it's ok in this case.
 *
 * @param {Object} state
 * @param {Number} numPlayers - the number of players to create, no more than the deck size
 * @preturn {Object} nextState
 */
function startGame(state) { 
	const players = createPlayers(state.numberOfPlayers);
	return Object.assign({}, state, {
		players,
		survivors: players.map((player, index) => { return index; }),
		gameState: GameState.DEAL,
		deck: copyShuffle(state.deck)
	});
}

/**
 * Deal all of the cards possible to the players. 
 * To make sure all players have an equal amount of cards,
 * some cards may still remain in the deck after dealing.
 *
 * @param {Object} state
 * @preturn {Object} nextState
 */
function deal(state) {
	const cardsPerHand = (state.deck.length / state.players.length)^0;
	const gameState = GameState.BATTLE;
	const deck = copyCards(state.deck);
	const players = copyPlayers(state.players);

	for (let i = 0; i < cardsPerHand; i++) {
		for (let j = 0; j < state.players.length; j++) {
			players[j].downStack.push(deck.shift());
		}
	}

	return Object.assign({}, state, {
		deck, 
		players, 
		gameState
	});
}

/**
 * Removes one card from each player's down stack and places
 * it face up in their pile.
 *
 * @param {Object} state
 * @preturn {Object} nextState
 */
function battle(state) {
	const players = copyPlayers(state.players);
	const gameState = GameState.DECIDE_BATTLE;

	state.survivors.forEach((index) => {
		const player = players[index];
		const card = player.downStack.shift();
		card.facing = Facing.UP;
		player.pile.push(card);
	});

	return Object.assign({}, state, {
		players, 
		gameState
	});
}

/**
 * Helper function to calculate the round winners for battle or war
 * from the survivors or warMongers.
 *
 * Returns an array of round winners who have the highest card.  
 *
 * @param {Array} participantIdxs - the indexes of the participants this round
 * @param (Array) players - an array of all the players
 * @return {Array} warMongers - indexes of player(s) with the highest card 
 */
function _getRoundWinners(participantIdxs, players) {
	let roundWinners = [];
	let maxRank;

	participantIdxs.forEach((index) => {
		const player = players[index];
		if (roundWinners.length === 0) {
			maxRank = player.pile[player.pile.length - 1].rank;
			roundWinners = [index];
		} else {
			let rank = player.pile[player.pile.length - 1].rank;
			
			if (rank > maxRank) {
				maxRank = rank;
				roundWinners = [index];
			} else if (rank === maxRank) {
				roundWinners.push(index);
			}
		}
	});

	return roundWinners;
}

/**
 * Decides the outcome of a battle.
 * Transitions the nextState to either a tie or war depending on the outcome.
 *
 * @param {Object} state
 * @preturn {Object} nextState
 */
function decideBattleOutcome(state) {
	let warMongers = _getRoundWinners(state.survivors, state.players);
	var gameState;
	let roundWinner = -1;

	if (warMongers.length === 1) {
		roundWinner = warMongers[0];
		warMongers = [];
		gameState = GameState.TAKE;
	} else {
		gameState = GameState.WAR;
	}

	return Object.assign({}, state, {
		gameState, 
		warMongers,
		roundWinner
	});
}

/**
 * Used to find out who the warMongers are based off of the number of cards
 * left in the players piles. This is used when warMongers run out cards,
 * but they were the remaining warMongers from a previous war (we only keep
 * a reference to the current warMongers.). It might be better to refactor
 * and keep a reference to a previous war, but we'll use this for now.
 *
 * @param {Object} state
 * @return {Array} warMongers - indexes of player(s) with the highest card
 */
function _getRemainingWarMongers(state) {
	let warMongers = [];
	let maxPileSize = 0;

	state.survivors.forEach((index) => {
		const player = state.players[index];
		const size = player.pile.length;

		// they had to be playing a round of war, not battle
		if (size > 1) {
			if (size > maxPileSize) {
				maxPileSize = player.pile.length;
				warMongers = [index];
			} else if (size === maxPileSize) {
				warMongers.push(index);
			} 
		}
	});

	return warMongers;
}

/**
 * Decides the outcome of a war.
 * Transitions the nextState to either a tie or ANOTHER war,
 * depending on the outcome.
 *
 * Handles the case where all war players run out of cards before war is over.
 * If they are the only players left then the game ends in a tie,
 * otherwise it falls back to the remaining survivors war/battle cards.
 *
 * @param {Object} state
 * @preturn {Object} nextState
 */
function decideWarOutcome(state) {
	let warMongers = _getRoundWinners(state.warMongers, state.players);
	var gameState;
	let roundWinner = -1;

	if (warMongers.length === 0) {
		// they all ran out of cards during battle and they all lose, so sad
		if (state.survivors.length === 0) {
			gameState = GameState.GAME_TIE;
		} else {
			// fallback and chose winner from the remaining survivors/warMongers
			warMongers = _getRemainingWarMongers(state);
			if (warMongers.length === 0) {
				return decideBattleOutcome(state);
			} if (warMongers.length === 1) {
				roundWinner = warMongers[0];
				warMongers = [];
				gameState = GameState.TAKE;
			} else {
				// we let the remaing war players battle for the cards
				// we may need another state for this scenario?
				gameState = GameState.WAR;
			}
		}
	} else if (warMongers.length === 1) {
		roundWinner = warMongers[0];
		warMongers = [];
		gameState = GameState.TAKE;
	} else {
		// we go to war again!
		gameState = GameState.WAR;
	}

	return Object.assign({}, state, {
		gameState, 
		warMongers,
		roundWinner
	});
}

/**
 * Places a card from each survivors's down stack into their pile face down.
 * Places another card from each survivors's down stack into their pile 
 * face up.
 *
 * Removes a player from survivors if they run out of cards while laying down
 * for war.
 *
 * The survivors should have at least one card for the war.
 * If they only have one they are removed from survivors.
 * If there are no survivors after a war, the game is ended in a tie.
 *
 * @param {Object} state
 * @preturn {Object} nextState
 */
function gotoWar(state) {
	const players = copyPlayers(state.players);
	const gameState = GameState.DECIDE_WAR;
	const survivors = state.survivors.slice();
	const warMongers = [];

	state.warMongers.forEach((index) => {
		const player = players[index];

		if (player.downStack.length > 0) {
			const card = player.downStack.shift();
			card.facing = Facing.DOWN;
			player.pile.push(card);
		} else {
			// a player who runs out of cards during war loses
			survivors.splice(survivors.indexOf(index), 1);
		}
	});

	state.warMongers.forEach((index) => {
		const player = players[index];

		if (player.downStack.length > 0) {
			const card = player.downStack.shift();
			card.facing = Facing.UP;
			player.pile.push(card);
			// only warMongers who have enough cards can stay in the war.
			warMongers.push(index);
		} else {
			// a player who runs out of cards during war loses
			survivors.splice(survivors.indexOf(index), 1);
		}
	});

	return Object.assign({}, state, {
		players, 
		gameState,
		survivors,
		warMongers
	});
}

// assumption: surivivors is length 1
/**
 * Take should only be called when there is a round winner for battle or war.
 * All the cards from the players hands are removed and given to the 
 * roundWinner.
 *
 * The Players array is called directly in case dead players have cards left
 * in their piles.
 *
 * Survivors is recalulated.
 *
 * @param {Object} state
 * @preturn {Object} nextState
 */
function take(state) {
	const players = copyPlayers(state.players);
	const roundSurvivor = players[state.roundWinner];
	const survivors = [state.roundWinner];
	const roundWinner = -1;

	// Take all cards from all piles (in case of war tie due to war players all being out)
	players.forEach((player, index) => {
		// all cards go back in face down
		player.pile.forEach((card) => {
			card.facing = Facing.DOWN;
		});

		// give the cards to the round winner
		roundSurvivor.downStack = roundSurvivor.downStack.concat(player.pile); 
		player.pile = [];

		// we leave out round winner in case they are out of cards,
		// since they WILL have cards after this is done, 
		// so we already added them in
		if (index !== state.roundWinner && player.downStack.length > 0) {
			survivors.push(index);
		}
	});

	const gameState = survivors.length === 1 ? GameState.GAME_WIN : GameState.BATTLE;

	return Object.assign({}, state, {
		players, 
		gameState, 
		survivors,
		roundWinner
	});
}

/**
 * Handles the game play by managing the game state.
 */
function play(state) {
	switch (state.gameState) {
		case GameState.START:
			return startGame(state, 4);
		case GameState.DEAL:
			return deal(state);
		case GameState.BATTLE:
			return battle(state);
		case GameState.WAR:
			return gotoWar(state);
		case GameState.DECIDE_BATTLE:
			return decideBattleOutcome(state);
		case GameState.DECIDE_WAR:
			return decideWarOutcome(state);
		case GameState.TAKE:
			return take(state);
		case GameState.GAME_TIE:
		case GameState.GAME_WIN:
		return initialState;
		default:
			return state;
	}
}

function setNumberOfPlayers(state, payload) {
	let numberOfPlayers;
	if (!payload) {
		numberOfPlayers = MIN_PLAYERS;
	} else if (payload.numberOfPlayers !== payload.numberOfPlayers) {
		numberOfPlayers = MIN_PLAYERS;
	} else if (payload.numberOfPlayers < MIN_PLAYERS) {
		numberOfPlayers = MIN_PLAYERS;
	} else if (payload.numberOfPlayers > MAX_PLAYERS) {
		numberOfPlayers = MAX_PLAYERS;
	} else {
		numberOfPlayers = payload.numberOfPlayers;
	}

	return Object.assign({}, state, { numberOfPlayers });
}

/**
 * The entry point to this reducer
 *
 * @param {Object} state
 * @param {Object} action - action must have at least one property called type
 * @preturn {Object} nextState
 */
function war(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.WAR_BUTTON_CLICK:
			return play(state);
		case ActionTypes.SET_NUMBER_OF_PLAYERS:
			return setNumberOfPlayers(state, action.payload);
		default:
			return state;
	}
}

const TestApi = {
	initialState,
	startGame, 
	deal,
	battle,
	gotoWar,
	decideBattleOutcome,
	decideWarOutcome,
	take
};

export { TestApi };

export default war;