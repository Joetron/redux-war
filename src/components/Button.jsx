import React from 'react';
import PropTypes from 'prop-types';
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

Button.propTypes = {
    onButtonClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
};

export default Button;