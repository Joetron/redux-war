import React, { Component } from 'react';
import logo from './war_doge.png';
import './App.css';
import Deck from './containers/Deck.js';
import GameButton from './containers/GameButton.js';
import WarPlayers from './containers/WarPlayers.js';
import Messenger from './containers/Messenger.js';

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>WAR!</h2>
				</div>
				<div className="App-content">
					<div className="side-spacer spacer-left" />
					<div className="war">
						<div className="war-panel">
							<Deck />
							<GameButton />
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
