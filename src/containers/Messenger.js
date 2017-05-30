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
			text = 'Welcome to war! Cards are dealt until deck is gone. ' + 
			       'Each player then lays down one battle card. ' +
			       'The person who has the highest battle card collects all played cards. ' + 
			       'Cards are ranked highest to lowest: A, K, Q, J, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1. ' +
			       'In the event of a tie, the players who tied go to war. ' +
			       'In war each player plays one card face down, then one face up. ' +
			       'The player with the highest face up card collects all the played cards. ' +
			       'If there is another tie, then another round of war is played. ' + 
			       'If a player cannot play a card during war, then they automatically lose. ' +
			       'If all players lose during war, then play falls back to the remaining survivors. ' +
			       'The last person to survive wins!!' ;
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