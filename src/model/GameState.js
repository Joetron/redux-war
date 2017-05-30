/**
 * This file contains all of the states that we'll use for war.
 * After the war button is pressed we'll check the game state to see what we 
 * need to do from there.
 */
const GameState = {
	START: 'start',
	DEAL: 'deal',
	BATTLE: 'battle',
	WAR: 'war',
	TAKE: 'take',
	DECIDE_BATTLE: 'decide battle',
	DECIDE_WAR: 'decide war',
	GAME_WIN: 'game_win',
	GAME_TIE: 'game_tie',
	ERROR: 'error'
}

export default GameState;