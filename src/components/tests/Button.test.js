import React from 'react';
import { mount } from 'enzyme';
import Button from '../Button.jsx';

function setup() {
    const props = {
        onButtonClick: jest.fn(),
        label: 'Start'
    }

    const enzymeWrapper = mount(<Button {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('<Button/>', () => {
    it('should render self and subcomponents', () => {
        const { enzymeWrapper } = setup();
        expect(enzymeWrapper.find('button').hasClass('button')).toBe(true);
    });
})