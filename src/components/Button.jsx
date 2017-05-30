import React from 'react';
import '../css/Button.css';

/**
 * A simple button with a label and an onClick callback
 *
 * @param {String} label
 * @param {Function} onButtonClick
 * @return {React.Component} Button
 */

const Button = ({onButtonClick, label}) => (
	<button className="button" onClick={onButtonClick} >{label}</button>
);

export default Button;