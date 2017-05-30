import React from 'react';
import { mount } from 'enzyme';
import Players from '../Players.jsx';
import CardImages from '../../images/CardImages.js';
import { createCard, Values, Suits } from '../../model/WarCards.js';

/**
 * Generates the player data for this test to keep the test functions cleaner.
 */
function getPlayerData() {
	const downStack = [];
	const back = CardImages.getBack();

	for (let i = 0; i < 23; i++) {
		downStack.push({ src: back, alt: 'back' });
	}

	return [
		{
			pile: {
				offset: 10,
				images: [
					{
						src: CardImages.getCard(createCard(Values.ACE, Suits.SPADES)),
						alt: 'ace of spades'
					},
					{ 
						src: back, 
						alt: 'back' 
					},
					{
						src: CardImages.getCard(createCard(Values.NINE, Suits.DIAMONDS)),
						alt: 'nine of diamonds'
					}
				]
			},
			downStack: {
				offset: 1,
				images: downStack
			}
		}
	];
}

function setup() {
	const props = {
		players: getPlayerData()
	}

	const enzymeWrapper = mount(<Players {...props} />)

	return {
		props,
		enzymeWrapper
	}
}

describe('<Players/>', () => {
	it('should render self and subcomponents', () => {
      	const { enzymeWrapper } = setup();

      	const stack = enzymeWrapper.find('Cards').at(0);
		const stackProps = stack.props();

		const pile = enzymeWrapper.find('Cards').at(1);
		const pileProps = pile.props();

		expect(stackProps.cardData.images.length).toBe(23);
		expect(pileProps.cardData.images.length).toBe(3);

		expect(stackProps.cardData.offset).toBe(1);
		expect(pileProps.cardData.offset).toBe(10);

		let img = stack.find('img').at(0).node;
		expect(img.src.indexOf('back')).not.toBeLessThan(0);
		expect(img.style.left).toEqual('0px');
		expect(img.alt).toEqual('back');

		img = stack.find('img').at(22).node;
		expect(img.style.left).toEqual('22px');

		img = pile.find('img').at(0).node;
		expect(img.src.indexOf('ace_spades')).not.toBeLessThan(0);
		expect(img.style.left).toEqual('0px');
		expect(img.alt).toEqual('ace of spades');

		img = pile.find('img').at(1).node;
		expect(img.src.indexOf('back')).not.toBeLessThan(0);
		expect(img.style.left).toEqual('10px');
		expect(img.alt).toEqual('back');

		img = pile.find('img').at(2).node;
		expect(img.src.indexOf('nine_diamonds')).not.toBeLessThan(0);
		expect(img.style.left).toEqual('20px');
		expect(img.alt).toEqual('nine of diamonds');
	});
});