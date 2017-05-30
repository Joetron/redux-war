import { connect } from 'react-redux';
import Cards from '../components/Cards.jsx';
import ConvertCards from './ConvertCards.js';

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