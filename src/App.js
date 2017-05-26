import React, { Component } from 'react';
import logo from './war_doge.png';
import './App.css';
import Cards from './components/Cards.jsx';
import WarPlayer from './components/WarPlayer.jsx';
import WarButton from './components/WarButton.jsx';
import CardImages from './images/CardImages.js';

// Some temporary dummy data to test rendering the components
const back = CardImages.getBack();
const aceSpades = CardImages.getCard('ace', 'spades');

const deck = {
	offset: 2,
	images: [ back, back, back ]
};

const pile = {
	offset: 20,
	images: [ aceSpades, back, aceSpades ]
};

const player = {downStack: deck, pile: pile};
const players = [player, player, player];
const onClick = () => {};

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome to War!</h2>
				</div>
				<div className="war">
					<div>
						<Cards type="deck" cardData={deck} />
						<WarButton label="start" />
					</div>
					<div className="players">
						{players.map((player, i) => <WarPlayer key={i} player={player} />)}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
