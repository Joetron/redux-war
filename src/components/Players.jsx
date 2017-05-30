import React from 'react';
import Player from './Player.jsx';

/**
 * Renders an array of players.
 * The pile is a combination of the battle reveal plus any war cards.
 *
 * @param {Array} players 
 * @return {React.Component} Players
 */
const Players = ({players}) => (
	<div className="players">
		{players.map((player, i) => <Player key={i} player={player} />)}
	</div>
);

export default Players;