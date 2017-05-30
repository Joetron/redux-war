import { connect } from 'react-redux';
import Cards from '../components/Cards.jsx';
import ConvertCards from './ConvertCards.js';

/**
 * Converts the card model data to card view data for rendering. 
 *
 * @param {Object} state
 * @return {Object} deckViewData
 */
const mapStateToProps = (state) => {
	return {
		type: 'deck',
		cardData: ConvertCards(state.war.deck ? state.war.deck : [], false)
	};	
};

const Deck = connect(
	mapStateToProps
)(Cards);

export default Deck;