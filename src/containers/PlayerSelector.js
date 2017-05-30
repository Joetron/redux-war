import { connect } from 'react-redux';
import Dropdown from 'react-dropdown';
import { setNumberOfPlayers } from '../actions';
import GameState from '../model/GameState.js';
import { MIN_PLAYERS, MAX_PLAYERS } from '../reducers/war.js';

/**
 * Returns the the options for the dropdown and sets the current value.
 * The player number is converted to a string first so it can display
 * properly in the Dropdown component.
 * Only allows selection before game starts.
 *
 * @return {Object} options
 */
const mapStateToProps = (state) => {
	//https://www.npmjs.com/package/react-dropdown
	const options = [];
	for (let i = MIN_PLAYERS; i <= MAX_PLAYERS; i++) {
		options.push('' + i);
	}
	const value = state.war.numberOfPlayers + '';
	const disabled = state.war.gameState !== GameState.START;

	return { options, value, disabled };	
};

/**
 * Dispatches the current option value ,converted back to a number,
 * to the setNumberOfPlayers action creator. 
 *
 * @param {Function} dispatch
 * @return (Object) onChange
 */
const mapDispatchToProps = (dispatch) => {
	return {
		onChange: (option) => { dispatch(setNumberOfPlayers(+option.value)); }
	}
};

const PlayerSelector = connect(
	mapStateToProps,
	mapDispatchToProps
)(Dropdown);

export default PlayerSelector;