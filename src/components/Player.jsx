import React from 'react';
import Cards from './Cards.jsx';
import '../css/Player.css';

/**
 * Renders a players downstack and pile.
 * The pile is a combination of the battle reveal plus any war cards.
 *
 * @param {Object} player 
 * @return {React.Component} Player
 */
const Player = ({player}) => (
	<div className="player">
		<Cards type="down-stack" cardData={player.downStack} />
		<Cards type="pile" cardData={player.pile} />
	</div>
);

export default Player;