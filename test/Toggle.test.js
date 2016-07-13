import React from 'react';
import classNames from 'classnames';
const { describe, it, __base } = global;
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';

const { Toggle } = require(`${__base}components`);

function noop () {

}

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

    expect(onChange.calledOnce).to.equal(true);
  });

  it('should render radio button when radio option is passed', () => {
    const onChange = sinon.spy();

    const wrapper = shallow(
      <Toggle
        name='radio'
        type='radio'
        onChange={onChange}
      />
    );

    expect(wrapper.find('i.icon-radio-button-unchecked')).to.have.length(1);

    wrapper.simulate('click');

    expect(onChange.calledOnce).to.equal(true);
  });

  it('should render label when passed', () => {
    const onChange = sinon.spy();

    const wrapper = shallow(
      <Toggle
        name='label'
        label='hello'
        iconLabel={['on', 'off']}
        onChange={onChange}
      />
    );

    expect(wrapper.find('.toggle-icon-label').text()).to.equal('off');

    wrapper.setProps({ value: true });

    expect(wrapper.find('.toggle-icon-label').text()).to.equal('on');
  });

  it('should not call render if both updated value and count are same', () => {
    const onChange = function () {
    };

    const render = sinon.spy(Toggle.prototype, 'render');

    const wrapper = shallow(
      <Toggle
        name='render'
        label='hello'
        value
        onChange={onChange}
        count={5}
      />
    );

    expect(render.calledOnce).to.equal(true);
    wrapper.setProps({
      value: true,
      count: 5
    });

    expect(render.calledTwice).to.equal(false);

    wrapper.setProps({
      value: true,
      count: 6
    });

    expect(render.calledTwice).to.equal(true);
  });

  it('should render the icon element if passed', () => {
    const onChange = noop;

    const iconElement = function (p) {
      const iconClass = classNames({
        'icon-not-selected': !p.value,
        'icon-selected': p.value
      });
      return <i className={iconClass} />;
    };

    const wrapper = shallow(
      <Toggle
        name={'toggle-icon-elem'}
        type={'checkbox'}
        iconElement={iconElement}
        onChange={onChange}
      />
    );

    expect(wrapper.find('.icon-not-selected')).has.length(1);

    wrapper.setProps({ value: true });

    expect(wrapper.find('.icon-selected')).has.length(1);
  });
});
