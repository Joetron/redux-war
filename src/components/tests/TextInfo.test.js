import React from 'react';
import { shallow } from 'enzyme';
import TextInfo from '../TextInfo.jsx';

function setup() {
    const props = {
        text: 'War is heck'
    }

    const enzymeWrapper = shallow(<TextInfo {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('<TextInfo/>', () => {
    it('should render self and subcomponents', () => {
        const { enzymeWrapper } = setup();
        const div = enzymeWrapper.find('div');
        expect(div.hasClass('text-info')).toBe(true);
        expect(div.text()).toEqual('War is heck');
    });
});