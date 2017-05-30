const Facing = {
	UP: 'up',
	DOWN: 'down'
};

const Values = {
	ACE: 'ace',
	TWO: 'two', 
	THREE: 'three', 
	FOUR: 'four', 
	FIVE: 'five', 
	SIX: 'six', 
	SEVEN: 'seven', 
	EIGHT: 'eight', 
	NINE: 'nine', 
	TEN: 'ten', 
	JACK: 'jack', 
	QUEEN: 'queen', 
	KING: 'king'
};

const Suits = {
	HEARTS: 'hearts',
	SPADES: 'spades',
	DIAMONDS: 'diamonds',
	CLUBS: 'clubs'
};

// The rankings of the card values, the index is the ranking
const ranks = [
	Values.TWO, 
	Values.THREE, 
	Values.FOUR, 
	Values.FIVE, 
	Values.SIX, 
	Values.SEVEN, 
	Values.EIGHT, 
	Values.NINE, 
	Values.TEN, 
	Values.JACK, 
	Values.QUEEN, 
	Values.KING,
	Values.ACE
];

/**
 * Creates a new war card with the given value and suit face down and
 * assigns it the proper ranking.
 *
 * @param {String} value
 * @param {String} suit
 * @return {Object} card
 */
export function createCard(value, suit) {
	return {
		rank: ranks.indexOf(value),
		value, 
		suit,
		facing: Facing.DOWN
	};
}

/**
 * Creates a new array of cards to be used in war.
 *
 * @return {Array} cards
 */
export function createDeck() {
	let cards = [];
	
	ranks.forEach((value, rank) => {
		for (const key in Suits) {
			cards.push(createCard(value, Suits[key]));
		}
	});

	return cards;
} 

/**
 * Copies an array of war cards created using createCard.
 *
 * @param {Array} cards
 * @return {Array} cardsCopy
 */
export function copyCards(cards) {
	return cards.map((card) => Object.assign({}, card, {}));
}

/**
 * Does an in place fisher yates shuffle of an array.
 *
 * @param {Array} array
 */
export function shuffle(array) {
	for (let i = array.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [array[i - 1], array[j]] = [array[j], array[i - 1]];
    }
}

/**
 * Copies an array of war cards created using createCard.
 *
 * @param {Array} cards
 * @return {Array} cardsCopy
 */
export function copyShuffle(deck) {
	const deckCopy = copyCards(deck);
	shuffle(deckCopy);

    return deckCopy;
}
 
export { Facing, Values, Suits };