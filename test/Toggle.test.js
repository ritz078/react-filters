import React from 'react';
const { describe, it, __base } = global;
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';

const { Toggle } = require(`${__base}components`);

describe('Toggle Component', () => {
  it('should call onChange function on click', () => {
    const onChange = sinon.spy();

    const wrapper = shallow(
      <Toggle
        name='switch'
        value={false}
        type='switch'
        onChange={onChange}
      />
    );

    wrapper.simulate('click');

    expect(onChange.called).to.equal(true);
  });

  it('should call onChange function with correct arguments', () => {
    const onChange = sinon.spy();

    const wrapper = shallow(
      <Toggle
        name='switch'
        value={false}
        type='switch'
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

  it('should change class to toggle-on on click', () => {
    const onChange = sinon.spy();

    const wrapper = shallow(
      <Toggle
        name='switch'
        value={false}
        type='switch'
        onChange={onChange}
      />
    );

    wrapper.simulate('click');

    expect(wrapper.closest('.rf-active')).to.have.length(1);
  });

  it('should render the count', () => {
    const onChange = sinon.spy();

    const wrapper = shallow(
      <Toggle
        name='switch'
        value={false}
        type='switch'
        onChange={onChange}
        label='hello'
        count={7}
      />
    );

    expect(wrapper.find('span.toggle-count')).to.have.length(1);
  });

  it('should render checkbox when checkbox option is passed', () => {
    const onChange = sinon.spy();

    const wrapper = shallow(
      <Toggle
        name='checkbox'
        type='checkbox'
        onChange={onChange}
        value={false}
      />
    );

    expect(wrapper.find('i.icon-check-box-outline-blank')).to.have.length(1);

    wrapper.simulate('click');

    expect(onChange.called).to.equal(true);
  });
});
