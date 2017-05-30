import React from 'react';
import {mount} from 'enzyme';
import Card from '../Card.jsx';
import CardImages from '../../images/CardImages.js';
import logo from '../../war_doge.png';
import { createCard } from '../../model/WarCards.js';

describe('<Card/>', () => {
	it('renders the back of a card 5px to the left.', function () {
		const card = mount(
			<Card 
				offset={5} 
				image={{src: CardImages.getBack(), alt: 'back'}}
			/>
		);

		const img = card.find('img').node;

		expect(img.src.indexOf('back')).not.toBeLessThan(0);
		expect(img.style.left).toEqual('5px');
		expect(img.alt).toEqual('back');
	});

	it('renders the ace of spades card.', function () {
		const cardData = createCard('ace', 'spades');
		const card = mount(
			<Card 
				offset={5} 
				image={{src: CardImages.getCard(cardData), alt: 'ace of spades'}}
			/>
		);

		const img = card.find('img').node;

		expect(img.src.indexOf('ace_spades')).not.toBeLessThan(0);
		expect(img.alt).toEqual('ace of spades');
	});
});