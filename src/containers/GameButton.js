import { connect } from 'react-redux';
import Button from '../components/Button.jsx';
import GameState from '../model/GameState.js';
import { onWarButtonClick } from '../actions';

const mapStateToProps = (state) => {
	let label = state.war.gameState;
	
	switch (state.war.gameState) {
		case GameState.START:
			label = 'Start Game';
			break;
		case GameState.DEAL:
			label = 'Deal Cards';
			break;
		case GameState.BATTLE:
			label = 'Battle';
			break;
		case GameState.WAR:
			label = 'Go to War';
			break;
		case GameState.DECIDE_BATTLE:
		case GameState.DECIDE_WAR:
		case GameState.TAKE:
			label = 'Continue';
			break;
		case GameState.GAME_TIE:
		case GameState.GAME_WIN:
			label = 'Start Over';
			break;
		default:
			label = '';
	}
	return { label };	
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onButtonClick: (gameState) => { dispatch(onWarButtonClick()); }
	}
};

const GameButton = connect(
	mapStateToProps,
	mapDispatchToProps
)(Button);

export default GameButton;