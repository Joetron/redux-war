import { connect } from 'react-redux';
import TextInfo from '../components/TextInfo.jsx';
import GameState from '../model/GameState.js';

function _generateTakeMessage(state) {
	const i = state.war.roundWinner + 1;
	if (i === 1) {
		return 'You have the round!'
	} else {
		return 'Player ' + i + ' won the round.';
	}
}

function _generateWinMessage(state) {
	const i = state.war.survivors[0] + 1; // TODO: test?
	if (i === 1) {
		return 'You won the war!!'
	} else {
		return 'Player ' + i + ' wins the war.';
	}
}

function _generateWarMessage(state) {
	let msg = state.war.warMongers.map((i) => i + 1).join(', ');

	return 'Oh it is ON!! Players ' + msg + ' are going to war!';
}

const mapStateToProps = (state) => {
	let text = state.war.gameState;
	
	switch (state.war.gameState) {
		case GameState.START:
			// TODO: move to a RulesComponent
			text = 'Select the number of players then click "Start Game"' ;
			break;
		case GameState.DEAL:
			text = 'The deck is shuffled.';
			break;
		case GameState.BATTLE:
			text = 'Are you ready?';
			break;
		case GameState.WAR:
			text = _generateWarMessage(state);
			break;
		case GameState.DECIDE_BATTLE:
			text = 'A tough battle has been fought!';
			break;
		case GameState.DECIDE_WAR:
			text = 'That was a vicious war!';
			break;
		case GameState.TAKE:
			text = _generateTakeMessage(state);
			break;
		case GameState.GAME_TIE:
			text = 'The game ends in a tie! More war or are you ready for peace?';
			break;
		case GameState.GAME_WIN:
			text = _generateWinMessage(state);
			break;
		default:
			text = '';
	}
	return { text };	
};

const Messenger = connect(
	mapStateToProps
)(TextInfo);

export default Messenger;