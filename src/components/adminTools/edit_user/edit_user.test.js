import React from 'react';
import { shallow } from 'enzyme';
import Edit_user from './edit_user';

describe('Edit_user', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Edit_user />);
    expect(wrapper).toMatchSnapshot();
  });
});
