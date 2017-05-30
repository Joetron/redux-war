import { getCard, getBack } from '../images/CardImages.js';
import { Facing } from '../model/WarCards.js';

/**
 * Converts an array of card model data to that of card view data.
 * 
 * @param {Array} cards
 * @param {Boolean} isSpread - true if spread, false if collapsed
 * @return {Object} cardViewData
 */
const ConvertCards = (cards, isSpread) => {
	const images = cards.map((card) => {
		let src, alt;

		if (card.facing === Facing.UP) {
			src = getCard(card);
			alt = card.value + ' of ' + card.suit;
		} else {
			src = getBack();
			alt = 'back of card';
		}

		return { src, alt };
	});

	return {
		offset: isSpread ? 10 : 1,
		images: images
	};
};

export default ConvertCards;