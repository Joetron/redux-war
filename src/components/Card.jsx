import React from 'react';
import PropTypes from 'prop-types';

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

Card.propTypes = {
    image: PropTypes.shape({
    	src: PropTypes.string.isRequired,
    	alt: PropTypes.string.isRequired
    }).isRequired,
    offset: PropTypes.number.isRequired
};

export default Card;