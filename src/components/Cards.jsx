import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card.jsx';
import '../css/Cards.css';

 /*
  * This class will render an array of Card components provided an array of 
  * card data.
  *
  * Card data should provided an offset for the cards, as well as the images.
  *
  * @param {Object} cardData - an object containing card data
  * @return {React.Component} Cards
  */
const Cards = ({type, cardData}) => {
return (
        <div className={type + " cards"} >
            {cardData.images.map((card, index) => (
                    <Card 
                        key={index} 
                        image={card} 
                        offset={cardData.offset * index}
                    />
                )
            )}
        </div>
    );
};

Cards.propTypes = {
    cardData: PropTypes.shape({
            images: PropTypes.array.isRequired,
            offset: PropTypes.number.isRequired
        }).isRequired,
    type: PropTypes.string.isRequired
};

export default Cards;