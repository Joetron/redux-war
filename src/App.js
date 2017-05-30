import React, { Component } from 'react';
import logo from './war_doge.png';
import './App.css';
import './css/DropDown.css';
import Deck from './containers/Deck.js';
import GameButton from './containers/GameButton.js';
import WarPlayers from './containers/WarPlayers.js';
import Messenger from './containers/Messenger.js';
import PlayerSelector from './containers/PlayerSelector.js';

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome to War!</h2>
				</div>
				<div className="App-content">
					<div className="side-spacer spacer-left" />
					<div className="war">
						<div className="war-panel">
							<Deck />
							<GameButton />
							<PlayerSelector />
							<Messenger />
						</div>
						<WarPlayers />
					</div>
					<div className="side-spacer spacer-right" />
				</div>
			</div>
		);
	}
}

export default App;
