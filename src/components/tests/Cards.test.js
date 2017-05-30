import React from 'react';
import { mount } from 'enzyme';
import Card from '../Card.jsx';
import Cards from '../Cards.jsx';
import CardImages from '../../images/CardImages.js';
import { createCard, Values, Suits } from '../../model/WarCards.js';

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
		const cardData = createCard(Values.ACE, Suits.SPADES);
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

describe('<Cards/>', () => {
	it('renders 2 cards face down offset by 5.', function () {
		const cardData = {
			offset: 5,
			images: [
				{
					src: CardImages.getBack(),
					alt: 'back'
				},
				{
					src: CardImages.getBack(),
					alt: 'back'
				}
			]
		};

		const card = mount(<Cards type="deck" cardData={cardData}/>);

		const img = card.find('img').node;

		expect(img.src.indexOf('back')).not.toBeLessThan(0);
		expect(img.style.left).toEqual('0px');
		expect(img.alt).toEqual('back');

		const img2 = card.find('img').at(1).node;

		expect(img2.src.indexOf('back')).not.toBeLessThan(0);
		expect(img2.style.left).toEqual('5px');
		expect(img2.alt).toEqual('back');
	});

	it('renders 2 cards face up offset by 10.', function () {
		const cardData = {
			offset: 10,
			images: [
				{
					src: CardImages.getCard(createCard(Values.ACE, Suits.SPADES)),
					alt: 'ace of spades'
				},
				{
					src: CardImages.getCard(createCard(Values.NINE, Suits.DIAMONDS)),
					alt: 'nine of diamonds'
				}
			]
		};

		const card = mount(<Cards type="deck" cardData={cardData}/>);

		const img = card.find('img').node;

		expect(img.src.indexOf('ace_spades')).not.toBeLessThan(0);
		expect(img.style.left).toEqual('0px');
		expect(img.alt).toEqual('ace of spades');

		const img2 = card.find('img').at(1).node;

		expect(img2.src.indexOf('nine_diamonds')).not.toBeLessThan(0);
		expect(img2.style.left).toEqual('10px');
		expect(img2.alt).toEqual('nine of diamonds');
	});
});