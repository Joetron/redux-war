import React from 'react';
import '../css/Button.css';

/**
 * A button for handling the various war states.
 * One button will handle all of the states rather than having multiple
 * buttons that would be toggled on/off.
 *
 * @param {String} label
 * @param {Function} onButtonClick
 * @return {React.Component} WarButton
 */

const WarButton = ({onButtonClick, label}) => (
	<button className="button" onClick={onButtonClick} >{label}</button>
);

export default WarButton;