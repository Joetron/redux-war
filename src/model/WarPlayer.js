
import { copyCards } from './WarCards.js';

/**
 * Create a new player with and the given id and an empty downStack and pile
 *
 * @param {String} id
 * @return {Object} player
 */
export function createPlayer(id) {
	return {
		id, 
		pile: [],
		downStack: []
	}
}

/**
 * Creates a new player array of given size with the generated ids.
 *
 * @param {Number} size
 * @return {Array} players
 */
export function createPlayers(size) {
	let players = [];
	for (var i = 0; i < size; i++) {
		players.push(createPlayer('player' + i));
	}

	return players;
}

/**
 * Copies a player array returning the new array.
 *
 * @param {Array} players
 * @return {Array} playersCopy
 */
export function copyPlayers(players) {
	return players.map((player) => {
		return {
			id: player.id,
			pile: copyCards(player.pile),
			downStack: copyCards(player.downStack)
		}
	});
}