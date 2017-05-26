import React from 'react';
import {mount} from 'enzyme';
import Card from '../Card.jsx';
import CardImages from '../../images/CardImages.js';
import logo from '../../war_doge.png';

describe('<Card/>', () => {
	it('renders the back of a card.', function () {
		const card = mount(<Card offset={5} image={CardImages.getBack()} />);
		const img = card.find('img');
		const src = img.node.src;
		expect(src.indexOf('back')).not.toBeLessThan(0);
	});

	it('offsets the card 5px to the left.', function () {
		const card = mount(<Card offset={5} image={CardImages.getBack()} />);
		const img = card.find('img');
		const left = img.node.style.left;
		expect(left).toEqual('5px');
	});

	it('renders the ace of spades card.', function () {
		const card = mount(<Card offset={5} image={CardImages.getCard('ace', 'spades')} />);
		const img = card.find('img');
		const src = img.node.src;
		expect(src.indexOf('ace_spades')).not.toBeLessThan(0);
	});
});