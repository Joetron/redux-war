import ActionTypes from '../actions/ActionTypes.js';
import GameState from '../model/GameState.js';
import { Facing, Values, Suits } from '../model/WarCards.js';
import war from './war.js';

describe('war reducer', () => {
	// Reuse so we don't have to recreate states for all of the tests.
	// For scenario driven tests we'll create mock data.
	let state;

	const action = {
		type: ActionTypes.WAR_BUTTON_CLICK
	};

	it('creates an initial state.', () => {
		state = war(undefined, {type: null});

		expect(state.gameState).toEqual(GameState.START);
		expect(state.players.length).toEqual(0);
	});

	it('creates 4 players and shuffles the deck.', () => {
		state = war(state, action);

		expect(state.gameState).toEqual(GameState.DEAL);
		expect(state.players.length).toEqual(4);
	});

	// state is started game, next state is deal
	it('deals 13 cards to each player.', () => {
		state = war(state, action);

		expect(state.gameState).toEqual(GameState.BATTLE);

		state.players.forEach((player) => {
			expect(player.downStack.length).toEqual(13);
		});
	});

	it('transfers 1 card from players stack to pile, face up.', () => {
		state = war(state, action);

		expect(state.gameState).toEqual(GameState.DECIDE_BATTLE);

		state.players.forEach((player) => {
			expect(player.downStack.length).toEqual(12);
		});

		state.players.forEach((player) => {
			expect(player.pile.length).toEqual(1);
			expect(player.pile[0].facing).toEqual(Facing.UP);
		});
	});

	it('chooses one winner from the battle.', () => {
		const currentState = {
			gameState: GameState.DECIDE_BATTLE,
			deck: [],
			survivors: [0, 1],
			warMongers: [],
			roundWinner: -1,
			players: [
				{
					downStack: [],
					pile: [{ rank: 12, value: Values.ACE, suite: Suits.CLUBS, facing: Facing.UP }]
				},
				{
					downStack: [],
					pile: [{ rank: 0, value: Values.TWO, suite: Suits.CLUBS, facing: Facing.UP }]
				}
			]
		};

		const nextState = war(currentState, action);
		expect(nextState.gameState).toEqual(GameState.TAKE);
		expect(nextState.roundWinner).toEqual(0);
		expect(nextState.warMongers.length).toEqual(0);
	});

	it('goes to war when 2 players have battle cards with same rank.', () => {
		const currentState = {
			gameState: GameState.DECIDE_BATTLE,
			deck: [],
			survivors: [0, 1, 2],
			warMongers: [],
			roundWinner: -1,
			players: [
				{
					downStack: [],
					pile: [{ rank: 12, value: Values.ACE, suite: Suits.CLUBS, facing: Facing.UP }]
				},
				{
					downStack: [],
					pile: [{ rank: 12, value: Values.ACE, suite: Suits.HEARTS, facing: Facing.UP }]
				},
				{
					downStack: [],
					pile: [{ rank: 0, value: Values.TWO, suite: Suits.CLUBS, facing: Facing.UP }]
				}
			]
		};

		const nextState = war(currentState, action);
		expect(nextState.gameState).toEqual(GameState.WAR);
		expect(nextState.roundWinner).toEqual(-1);
		expect(nextState.warMongers.length).toEqual(2);
	});

	it('goes to war when 3 players have battle cards with same rank.', () => {
		const currentState = {
			gameState: GameState.DECIDE_BATTLE,
			deck: [],
			survivors: [0, 1, 2, 3],
			warMongers: [],
			roundWinner: -1,
			players: [
				{
					downStack: [],
					pile: [{ rank: 12, value: Values.ACE, suite: Suits.CLUBS, facing: Facing.UP }]
				},
				{
					downStack: [],
					pile: [{ rank: 12, value: Values.ACE, suite: Suits.SPADES, facing: Facing.UP }]
				},
				{
					downStack: [],
					pile: [{ rank: 12, value: Values.ACE, suite: Suits.HEARTS, facing: Facing.UP }]
				},
				{
					downStack: [],
					pile: [{ rank: 0, value: Values.TWO, suite: Suits.CLUBS, facing: Facing.UP }]
				}
			]
		};

		const nextState = war(currentState, action);
		expect(nextState.gameState).toEqual(GameState.WAR);
		expect(nextState.roundWinner).toEqual(-1);
		expect(nextState.warMongers.length).toEqual(3);
		expect(nextState.warMongers).toEqual([0, 1, 2]);
	});

	it('goes to war when 2 players have 2 cards with same rank.', () => {
		const currentState = {
			gameState: GameState.DECIDE_WAR,
			deck: [],
			survivors: [0, 1, 2, 3],
			warMongers: [0, 1, 2],
			roundWinner: -1,
			players: [
				{
					downStack: [],
					pile: [
						{ rank: 12, value: Values.ACE, suite: Suits.CLUBS, facing: Facing.UP },
						{ rank:  2, value: Values.FOUR, suite: Suits.CLUBS, facing: Facing.DOWN },
						{ rank: 11, value: Values.KING, suite: Suits.CLUBS, facing: Facing.UP }
					]
				},
				{
					downStack: [],
					pile: [
						{ rank: 12, value: Values.ACE, suite: Suits.SPADES, facing: Facing.UP },
						{ rank:  3, value: Values.FIVE, suite: Suits.CLUBS, facing: Facing.DOWN },
						{ rank: 11, value: Values.KING, suite: Suits.SPADES, facing: Facing.UP }
					]
				},
				{
					downStack: [],
					pile: [
						{ rank: 12, value: Values.ACE, suite: Suits.HEARTS, facing: Facing.UP },
						{ rank: 12, value: Values.ACE, suite: Suits.CLUBS, facing: Facing.UP },
						{ rank: 10, value: Values.QUEEN, suite: Suits.CLUBS, facing: Facing.UP }
					]
				},
				{
					downStack: [],
					pile: [
						{ rank: 0, value: Values.TWO, suite: Suits.CLUBS, facing: Facing.UP }
					]
				}
			]
		};

		const nextState = war(currentState, action);
		expect(nextState.gameState).toEqual(GameState.WAR);
		expect(nextState.roundWinner).toEqual(-1);
		expect(nextState.warMongers.length).toEqual(2);
		expect(nextState.warMongers).toEqual([0, 1]);
	});

	it('chooses a round winner when on the third round of war when a player has finally won.', () => {

		const currentState = {
			gameState: GameState.DECIDE_WAR,
			deck: [],
			survivors: [0, 1, 2, 3],
			warMongers: [0, 1],
			roundWinner: -1,
			players: [
				{
					downStack: [],
					pile: [
						{ rank: 12, value: Values.ACE,  suite: Suits.CLUBS, facing: Facing.UP },
						{ rank:  2, value: Values.FOUR, suite: Suits.CLUBS, facing: Facing.DOWN },
						{ rank: 11, value: Values.KING, suite: Suits.CLUBS, facing: Facing.UP },
						{ rank:  8, value: Values.NINE, suite: Suits.CLUBS, facing: Facing.DOWN },
						{ rank:  9, value: Values.JACK, suite: Suits.CLUBS, facing: Facing.UP }
					]
				},
				{
					downStack: [],
					pile: [
						{ rank: 12, value: Values.ACE,  suite: Suits.SPADES, facing: Facing.UP },
						{ rank:  3, value: Values.FIVE, suite: Suits.CLUBS,  facing: Facing.DOWN },
						{ rank: 11, value: Values.KING, suite: Suits.SPADES, facing: Facing.UP },
						{ rank:  8, value: Values.NINE, suite: Suits.SPADES, facing: Facing.DOWN },
						{ rank:  7, value: Values.TEN,  suite: Suits.CLUBS,  facing: Facing.UP }
					]
				},
				{
					downStack: [],
					pile: [
						{ rank: 12, value: Values.ACE,   suite: Suits.HEARTS, facing: Facing.UP },
						{ rank: 12, value: Values.ACE,   suite: Suits.CLUBS,  facing: Facing.UP },
						{ rank: 10, value: Values.QUEEN, suite: Suits.CLUBS,  facing: Facing.UP }
					]
				},
				{
					downStack: [],
					pile: [
						{ rank: 0, value: Values.TWO, suite: Suits.CLUBS, facing: Facing.UP }
					]
				}
			]
		};

		const nextState = war(currentState, action);
		expect(nextState.gameState).toEqual(GameState.TAKE);
		expect(nextState.roundWinner).toEqual(0);
		expect(nextState.warMongers.length).toEqual(0);
	});

	it('chooses remaining war players from previous war to continue when current war players run out cards.', () => {
		const currentState = {
			gameState: GameState.DECIDE_WAR,
			deck: [],
			survivors: [2, 3, 4],
			warMongers: [],
			roundWinner: -1,
			players: [
				{
					downStack: [],
					pile: [
						{ rank: 12, value: Values.ACE,  suite: Suits.CLUBS, facing: Facing.UP },
						{ rank:  2, value: Values.FOUR, suite: Suits.CLUBS, facing: Facing.DOWN },
						{ rank: 11, value: Values.KING, suite: Suits.CLUBS, facing: Facing.UP },
						{ rank:  7, value: Values.NINE, suite: Suits.CLUBS, facing: Facing.DOWN },
						{ rank:  9, value: Values.JACK, suite: Suits.CLUBS, facing: Facing.UP }
					]
				},
				{
					downStack: [],
					pile: [
						{ rank: 12, value: Values.ACE,  suite: Suits.SPADES, facing: Facing.UP },
						{ rank:  3, value: Values.FIVE, suite: Suits.CLUBS,  facing: Facing.DOWN },
						{ rank: 11, value: Values.KING, suite: Suits.SPADES, facing: Facing.UP },
						{ rank:  7, value: Values.NINE, suite: Suits.SPADES, facing: Facing.DOWN },
						{ rank:  8, value: Values.TEN,  suite: Suits.CLUBS,  facing: Facing.UP }
					]
				},
				{
					downStack: [{ rank: 12, value: Values.ACE,   suite: Suits.CLUBS,  facing: Facing.UP }],
					pile: [
						{ rank: 12, value: Values.ACE,   suite: Suits.HEARTS, facing: Facing.UP },
						{ rank: 12, value: Values.ACE,   suite: Suits.CLUBS,  facing: Facing.UP },
						{ rank:  5, value: Values.SIX,   suite: Suits.CLUBS,  facing: Facing.UP }
					]
				},
				{
					downStack: [{ rank: 12, value: Values.ACE,   suite: Suits.CLUBS,  facing: Facing.UP }],
					pile: [
						{ rank: 12, value: Values.ACE,   suite: Suits.HEARTS, facing: Facing.UP },
						{ rank: 12, value: Values.ACE,   suite: Suits.CLUBS,  facing: Facing.UP },
						{ rank:  5, value:  Values.SIX,  suite: Suits.CLUBS,  facing: Facing.UP }
					]
				},
				{
					downStack: [{ rank: 0, value: Values.TWO,   suite: Suits.CLUBS,  facing: Facing.UP }],
					pile: [
						{ rank: 0, value: Values.TWO, suite: Suits.CLUBS, facing: Facing.UP }
					]
				}
			]
		};

		const nextState = war(currentState, action);
		expect(nextState.gameState).toEqual(GameState.WAR);
		expect(nextState.warMongers.length).toEqual(2);
		expect(nextState.warMongers).toEqual([2,3]);
	});

	it('chooses remaining war player from previous war to be the round winner when current war players run out cards.', () => {
		const currentState = {
			gameState: GameState.DECIDE_WAR,
			deck: [],
			survivors: [2, 3],
			warMongers: [],
			roundWinner: -1,
			players: [
				{
					downStack: [],
					pile: [
						{ rank: 12, value: Values.ACE,  suite: Suits.CLUBS, facing: Facing.UP },
						{ rank:  2, value: Values.FOUR, suite: Suits.CLUBS, facing: Facing.DOWN },
						{ rank: 11, value: Values.KING, suite: Suits.CLUBS, facing: Facing.UP },
						{ rank:  7, value: Values.NINE, suite: Suits.CLUBS, facing: Facing.DOWN },
						{ rank:  9, value: Values.JACK, suite: Suits.CLUBS, facing: Facing.UP }
					]
				},
				{
					downStack: [],
					pile: [
						{ rank: 12, value: Values.ACE,  suite: Suits.SPADES, facing: Facing.UP },
						{ rank:  3, value: Values.FIVE, suite: Suits.CLUBS,  facing: Facing.DOWN },
						{ rank: 11, value: Values.KING, suite: Suits.SPADES, facing: Facing.UP },
						{ rank:  7, value: Values.NINE, suite: Suits.SPADES, facing: Facing.DOWN },
						{ rank:  8, value: Values.TEN,  suite: Suits.CLUBS,  facing: Facing.UP }
					]
				},
				{
					downStack: [{ rank: 12, value: Values.ACE,   suite: Suits.CLUBS,  facing: Facing.UP }],
					pile: [
						{ rank: 12, value: Values.ACE,   suite: Suits.HEARTS, facing: Facing.UP },
						{ rank: 12, value: Values.ACE,   suite: Suits.CLUBS,  facing: Facing.UP },
						{ rank:  5, value: Values.SIX,   suite: Suits.CLUBS,  facing: Facing.UP }
					]
				},
				{
					downStack: [{ rank: 0, value: Values.TWO,   suite: Suits.CLUBS,  facing: Facing.UP }],
					pile: [
						{ rank: 0, value: Values.TWO, suite: Suits.CLUBS, facing: Facing.UP }
					]
				}
			]
		};

		const nextState = war(currentState, action);
		expect(nextState.gameState).toEqual(GameState.TAKE);
		expect(nextState.warMongers.length).toEqual(0);
		expect(nextState.roundWinner).toEqual(2);
	});

	it('chooses remaining survivor with highest battle card to be the round winner when war players run out of cards.', () => {
		const currentState = {
			gameState: GameState.DECIDE_WAR,
			deck: [],
			survivors: [2, 3],
			warMongers: [],
			roundWinner: -1,
			players: [
				{
					downStack: [],
					pile: [
						{ rank: 12, value: Values.ACE,  suite: Suits.CLUBS, facing: Facing.UP },
						{ rank:  2, value: Values.FOUR, suite: Suits.CLUBS, facing: Facing.DOWN },
						{ rank: 11, value: Values.KING, suite: Suits.CLUBS, facing: Facing.UP },
						{ rank:  7, value: Values.NINE, suite: Suits.CLUBS, facing: Facing.DOWN },
						{ rank:  9, value: Values.JACK, suite: Suits.CLUBS, facing: Facing.UP }
					]
				},
				{
					downStack: [],
					pile: [
						{ rank: 12, value: Values.ACE,  suite: Suits.SPADES, facing: Facing.UP },
						{ rank:  3, value: Values.FIVE, suite: Suits.CLUBS,  facing: Facing.DOWN },
						{ rank: 11, value: Values.KING, suite: Suits.SPADES, facing: Facing.UP },
						{ rank:  7, value: Values.NINE, suite: Suits.SPADES, facing: Facing.DOWN },
						{ rank:  8, value: Values.TEN,  suite: Suits.CLUBS,  facing: Facing.UP }
					]
				},
				{
					downStack: [{ rank: 0, value: Values.TWO,   suite: Suits.CLUBS,  facing: Facing.UP }],
					pile: [
						{ rank: 1, value: Values.THREE, suite: Suits.CLUBS, facing: Facing.UP }
					]
				},
				{
					downStack: [{ rank: 0, value: Values.TWO,   suite: Suits.CLUBS,  facing: Facing.UP }],
					pile: [
						{ rank: 0, value: Values.TWO, suite: Suits.CLUBS, facing: Facing.UP }
					]
				}
			]
		};

		const nextState = war(currentState, action);
		expect(nextState.gameState).toEqual(GameState.TAKE);
		expect(nextState.warMongers.length).toEqual(0);
		expect(nextState.roundWinner).toEqual(2);
	});

	it('chooses to end the game in a tie when war players run out of cards and their are no survivors.', () => {
		const currentState = {
			gameState: GameState.DECIDE_WAR,
			deck: [],
			survivors: [],
			warMongers: [],
			roundWinner: -1,
			players: [
				{
					downStack: [],
					pile: [
						{ rank: 12, value: Values.ACE,  suite: Suits.CLUBS, facing: Facing.UP },
						{ rank:  2, value: Values.FOUR, suite: Suits.CLUBS, facing: Facing.DOWN },
						{ rank: 11, value: Values.KING, suite: Suits.CLUBS, facing: Facing.UP },
						{ rank:  7, value: Values.NINE, suite: Suits.CLUBS, facing: Facing.DOWN },
						{ rank:  9, value: Values.JACK, suite: Suits.CLUBS, facing: Facing.UP }
					]
				},
				{
					downStack: [],
					pile: [
						{ rank: 12, value: Values.ACE,  suite: Suits.SPADES, facing: Facing.UP },
						{ rank:  3, value: Values.FIVE, suite: Suits.CLUBS,  facing: Facing.DOWN },
						{ rank: 11, value: Values.KING, suite: Suits.SPADES, facing: Facing.UP },
						{ rank:  7, value: Values.NINE, suite: Suits.SPADES, facing: Facing.DOWN },
						{ rank:  8, value: Values.TEN,  suite: Suits.CLUBS,  facing: Facing.UP }
					]
				}
			]
		};

		const nextState = war(currentState, action);
		expect(nextState.gameState).toEqual(GameState.GAME_TIE);
	});

	it('takes remaing cards from remaining survivors resulting in a win for player 3.', () => {
		const currentState = {
			gameState: GameState.TAKE,
			deck: [],
			survivors: [0, 1, 2, 3],
			warMongers: [],
			roundWinner: 2,
			players: [
				{
					downStack: [],
					pile: [{ rank: 0, value: Values.TWO,   suite: Suits.CLUBS,  facing: Facing.UP }]
				},
				{
					downStack: [],
					pile: [{ rank: 0, value: Values.TWO,   suite: Suits.CLUBS,  facing: Facing.UP }]
				},
				{
					downStack: [{ rank: 0, value: Values.TWO,   suite: Suits.CLUBS,  facing: Facing.UP }],
					pile: [
						{ rank: 1, value: Values.THREE, suite: Suits.CLUBS, facing: Facing.UP }
					]
				},
				{
					downStack: [],
					pile: [{ rank: 0, value: Values.TWO,   suite: Suits.CLUBS,  facing: Facing.UP }]
				}
			]
		};

		const nextState = war(currentState, action);
		expect(nextState.gameState).toEqual(GameState.GAME_WIN);
		expect(nextState.players[2].downStack.length).toEqual(5);
		expect(nextState.survivors.length).toEqual(1);
	});

	it('takes cards from dead players piles.', () => {
		const currentState = {
			gameState: GameState.TAKE,
			deck: [],
			survivors: [2],
			warMongers: [],
			roundWinner: 2,
			players: [
				{
					downStack: [],
					pile: [{ rank: 0, value: Values.TWO,   suite: Suits.CLUBS,  facing: Facing.UP }]
				},
				{
					downStack: [],
					pile: [{ rank: 0, value: Values.TWO,   suite: Suits.CLUBS,  facing: Facing.UP }]
				},
				{
					downStack: [{ rank: 0, value: Values.TWO,   suite: Suits.CLUBS,  facing: Facing.UP }],
					pile: [
						{ rank: 1, value: Values.THREE, suite: Suits.CLUBS, facing: Facing.UP }
					]
				},
				{
					downStack: [],
					pile: [{ rank: 0, value: Values.TWO,   suite: Suits.CLUBS,  facing: Facing.UP }]
				}
			]
		};

		const nextState = war(currentState, action);
		expect(nextState.gameState).toEqual(GameState.GAME_WIN);
		expect(nextState.players[2].downStack.length).toEqual(5);
	});
});