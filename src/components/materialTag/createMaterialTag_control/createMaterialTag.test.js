import React from 'react';
import { shallow } from 'enzyme';
import CreateMaterialTag from './createMaterialTag';

describe('CreateMaterialTag', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<CreateMaterialTag />);
    expect(wrapper).toMatchSnapshot();
  });
});
