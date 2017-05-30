import { onWarButtonClick } from './index.js';
import ActionTypes from './ActionTypes';

describe('actions', () => {
	it('should create a war button click action.', () => {
		const expectedAction = {
		  	type: ActionTypes.WAR_BUTTON_CLICK,
		}
		expect(onWarButtonClick()).toEqual(expectedAction);
	})
});