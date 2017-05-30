/**
 * CardImages imports all of the cards used in war and creates getter functions
 * for mapping card data to the proper card images.
 */
import back from './blue_diamond_back.png';
import aceClubs from './ace_clubs.png';
import aceDiamonds from './ace_diamonds.png';
import aceHearts from './ace_hearts.png';
import aceSpades from './ace_spades.png';
import eightClubs from './eight_clubs.png';
import eightDiamonds from './eight_diamonds.png';
import eightHearts from './eight_hearts.png';
import eightSpades from './eight_spades.png';
import fiveClubs from './five_clubs.png';
import fiveDiamonds from './five_diamonds.png';
import fiveHearts from './five_hearts.png';
import fiveSpades from './five_spades.png';
import fourClubs from './four_clubs.png';
import fourDiamonds from './four_diamonds.png';
import fourHearts from './four_hearts.png';
import fourSpades from './four_spades.png';
import jackClubs from './jack_clubs.png';
import jackDiamonds from './jack_diamonds.png';
import jackHearts from './jack_hearts.png';
import jackSpades from './jack_spades.png';
import kingClubs from './king_clubs.png';
import kingDiamonds from './king_diamonds.png';
import kingHearts from './king_hearts.png';
import kingSpades from './king_spades.png';
import nineClubs from './nine_clubs.png';
import nineDiamonds from './nine_diamonds.png';
import nineHearts from './nine_hearts.png';
import nineSpades from './nine_spades.png';
import queenClubs from './queen_clubs.png';
import queenDiamonds from './queen_diamonds.png';
import queenHearts from './queen_hearts.png';
import queenSpades from './queen_spades.png';
import sevenClubs from './seven_clubs.png';
import sevenDiamonds from './seven_diamonds.png';
import sevenHearts from './seven_hearts.png';
import sevenSpades from './seven_spades.png';
import sixClubs from './six_clubs.png';
import sixDiamonds from './six_diamonds.png';
import sixHearts from './six_hearts.png';
import sixSpades from './six_spades.png';
import tenClubs from './ten_clubs.png';
import tenDiamonds from './ten_diamonds.png';
import tenHearts from './ten_hearts.png';
import tenSpades from './ten_spades.png';
import threeClubs from './three_clubs.png';
import threeDiamonds from './three_diamonds.png';
import threeHearts from './three_hearts.png';
import threeSpades from './three_spades.png';
import twoClubs from './two_clubs.png';
import twoDiamonds from './two_diamonds.png';
import twoHearts from './two_hearts.png';
import twoSpades from './two_spades.png';
import { Values, Suits } from '../model/WarCards.js';

const images = {
	back,
	aceClubs,
	aceDiamonds,
	aceHearts,
	aceSpades,
	eightClubs,
	eightDiamonds,
	eightHearts,
	eightSpades,
	fiveClubs,
	fiveDiamonds,
	fiveHearts,
	fiveSpades,
	fourClubs,
	fourDiamonds,
	fourHearts,
	fourSpades,
	jackClubs,
	jackDiamonds,
	jackHearts,
	jackSpades,
	kingClubs,
	kingDiamonds,
	kingHearts,
	kingSpades,
	nineClubs,
	nineDiamonds,
	nineHearts,
	nineSpades,
	queenClubs,
	queenDiamonds,
	queenHearts,
	queenSpades,
	sevenClubs,
	sevenDiamonds,
	sevenHearts,
	sevenSpades,
	sixClubs,
	sixDiamonds,
	sixHearts,
	sixSpades,
	tenClubs,
	tenDiamonds,
	tenHearts,
	tenSpades,
	threeClubs,
	threeDiamonds,
	threeHearts,
	threeSpades,
	twoClubs,
	twoDiamonds,
	twoHearts,
	twoSpades
};

/**
 * Returns a card image given from the imported cards images
 * given a value and suit.
 * In the event of an error it returns the back of the card.
 * However, getBack should be used explicitly to get the back.
 *
 * @param (Object) card - a card that should have a valid value and suit
 * @return (String) url - the url of the card
 */
export const getCard = (card) => {
	const { value, suit } = card;
	let valKey, suitKey;

	switch(value) {
		case Values.ACE:
		case Values.TWO:
		case Values.THREE:
		case Values.FOUR:
		case Values.FIVE:
		case Values.SIX:
		case Values.SEVEN:
		case Values.EIGHT:
		case Values.NINE:
		case Values.TEN:
		case Values.JACK:
		case Values.QUEEN:
		case Values.KING:
			valKey = value;
			break;
		default:
			valKey = false;
	}

	switch(suit) {
		case Suits.HEARTS:
		case Suits.DIAMONDS:
		case Suits.SPADES:
		case Suits.CLUBS:
			suitKey = suit.charAt(0).toUpperCase() + suit.slice(1);
			break;
		default:
			suitKey = false;
	}

	return valKey && suitKey ? images[valKey + suitKey] : back;
}

/**
 * @return {String} url - the url for the back of the card
 */
export const getBack = () => back;

const CardImages = {
	getCard, getBack
}

export default CardImages;