
import { copyCards } from './WarCards.js';

function createPlayer(id) {
	return {
		id, 
		pile: [],
		downStack: [],
		roundWinner: false
	}
}

function createPlayers(count) {
	let players = [];
	for (var i = 0; i < count; i++) {
		players.push(createPlayer('player' + i));
	}

	return players;
}

function copyPlayers(players) {
	return players.map((player) => {
		return {
			id: player.id,
			roundWinner: player.roundWinner,
			pile: copyCards(player.pile),
			downStack: copyCards(player.downStack)
		}
	});
}

export { createPlayers, copyPlayers };