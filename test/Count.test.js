import React from 'react';
const { describe, it, __base } = global;
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';

const { Count } = require(`${__base}components`);

describe('Count Component', () => {
  it('should call onChange function with correct args on click', () => {
    const onChange = sinon.spy();
    const wrapper = shallow(
      <Count
        name='count'
        onChange={onChange}
        value={5}
      />
    );

    const args1 = {
      name: 'count',
      value: 6,
      action: 'increased'
    };

    const args2 = {
      name: 'count',
      value: 4,
      action: 'decreased'
    };

    wrapper.find('.cb-upper').simulate('click');
    expect(onChange.calledWith(args1)).to.equal(true);
    wrapper.find('.cb-lower').simulate('click');
    expect(onChange.calledWith(args2)).to.equal(true);

    expect(onChange.calledTwice).to.equal(true);
  });

  it('should be inactive when disabled', () => {
    const onChange = sinon.spy();
    const wrapper = shallow(
      <Count
        name='count'
        onChange={onChange}
        value={5}
        disabled
      />
    );

    wrapper.find('.cb-lower').simulate('click');
    expect(onChange.calledOnce).to.equal(false);
  });

  it('should only be active in the provided range', () => {
    const onChange = sinon.spy();
    const wrapper = shallow(
      <Count
        name='count'
        onChange={onChange}
        value={5}
        max={5}
        min={0}
      />
    );

    wrapper.find('.cb-upper').simulate('click');
    expect(onChange.calledOnce).to.equal(false);

    wrapper.find('.cb-lower').simulate('click');
    expect(onChange.calledOnce).to.equal(true);
  });

  it('should change with the provided step', () => {
    const onChange = sinon.spy();
    const wrapper = shallow(
      <Count
        name='count'
        onChange={onChange}
        value={5}
        step={2}
      />
    );

    wrapper.find('.cb-upper').simulate('click');
    const args1 = {
      name: 'count',
      value: 7,
      action: 'increased'
    };

    expect(onChange.calledWith(args1)).to.equal(true);

    wrapper.find('.cb-lower').simulate('click');
    const args2 = {
      name: 'count',
      value: 3,
      action: 'decreased'
    };

    expect(onChange.calledWith(args2)).to.equal(true);
  });
});
