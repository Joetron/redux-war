/**
 * Our single action creator for War!
 */

import ActionTypes from './ActionTypes.js';

export const onWarButtonClick = () => {
	return {
		type: ActionTypes.WAR_BUTTON_CLICK
	};
};