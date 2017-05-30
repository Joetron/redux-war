import React from 'react';
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

export default TextInfo;