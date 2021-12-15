import React from 'react';
import { shallow } from 'enzyme';
import MaterialTagManual from './materialTagManual';

describe('MaterialTagManual', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<MaterialTagManual />);
    expect(wrapper).toMatchSnapshot();
  });
});
