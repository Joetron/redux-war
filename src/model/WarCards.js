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

export function createCard(value, suit) {
	return {
		rank: ranks.indexOf(value),
		value, 
		suit,
		facing: Facing.DOWN
	};
}

export function createDeck() {
	let cards = [];
	
	ranks.forEach((value, rank) => {
		for (const key in Suits) {
			cards.push(createCard(value, Suits[key]));
		}
	});

	return cards;
} 

export function copyCards(cards) {
	return cards.map((card) => Object.assign({}, card, {}));
}

export function shuffle(cards) {
	for (let i = cards.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [cards[i - 1], cards[j]] = [cards[j], cards[i - 1]];
    }
}

export function copyShuffle(deck) {
	const deckCopy = copyCards(deck);
	shuffle(deckCopy);

    return deckCopy;
}
 
export { Facing, Values, Suits };