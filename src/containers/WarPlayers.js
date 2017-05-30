import { connect } from 'react-redux';
import Players from '../components/Players.jsx';
import ConvertCards from './ConvertCards.js';

const mapStateToProps = (state) => {
	const players = state.war.players.map((player) => {
		return {
			pile: ConvertCards(player.pile, true),
			downStack: ConvertCards(player.downStack, false)
		};
	});
	
	return { players };
};

const WarPlayers = connect(
	mapStateToProps
)(Players);

export default WarPlayers;