import React from 'react';

/**
 * Renders a Card as as an img using the provided src.
 *
 * @param {String} image - the link to the card image
 * @param {Number} offset - the amount the card should be offset in the pile
 * @return {React.Component} Card
 */
const Card = ({image, offset}) => (
	<img 
		alt={image.alt}
		className="card" 
		src={image.src} 
		style={{left: offset}}
	/>
);

export default Card;