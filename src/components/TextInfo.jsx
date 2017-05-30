import React from 'react';
import PropTypes from 'prop-types';
import '../css/TextInfo.css';

/**
 * Renders text into an information container
 *
 * @param {String} text 
 * @return {React.Component} TextInfo
 */
const TextInfo = ({text}) => (
	<div className='text-info'>{text}</div>
);

TextInfo.propTypes = {
    text: PropTypes.string
};

export default TextInfo;