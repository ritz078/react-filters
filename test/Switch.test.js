import React from 'react';
const { describe, it } = global;
import { mount } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';

import { Switch } from '../components';


describe('Switch Component', () => {
  it('should call onChange function on click', () => {
    const onChange = sinon.spy();

    const wrapper = mount(
      <Switch
        name='switch'
        value={false}
        onChange={onChange}
      />
    );

    wrapper.simulate('click');

    expect(onChange.called).to.equal(true);
  });

  it('should call onChange function with correct arguments', () => {
    const onChange = sinon.spy();

    const wrapper = mount(
      <Switch
        name='switch'
        value={false}
        onChange={onChange}
      />
    );

    wrapper.simulate('click');

    const args = {
      name: 'switch',
      value: true
    };

    expect(onChange.calledWith(args)).to.equal(true);
  });
});