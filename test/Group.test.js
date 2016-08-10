import React from 'react';
const { describe, it, before, __base } = global;
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';

const { Group } = require(`${__base}components`);

describe('Group Component', () => {
  let value;

  before(() => (
    value = [{
      id:1,
      label: 'a',
      count: 6
    }, {
      id:2,
      label: 'b'
    }, {
      id:3,
      label: 'c'
    }]
  ));

  it('should render Toggle component', () => {
    const onChange = sinon.spy();
    const wrapper = shallow(
      <Group
        name={'type'}
        type={'switch'}
        value={value}
        onChange={onChange}
      />
    );

    expect(wrapper.hasClass('switch-group')).to.equal(true);
    expect(wrapper.find('Toggle')).to.have.length(3);
  });

  it('should call onChange on click with correct arguments', () => {
    const onChange = sinon.spy();
    const wrapper = mount(
      <Group
        name={'change'}
        type={'checkbox'}
        onChange={onChange}
        value={value}
      />
    );

    wrapper.find('Toggle').at(1).simulate('click');

    const args = {
      name: 'change',
      value: [{
        id:1,
        label: 'a',
        count: 6
      }, {
        id:2,
        label: 'b',
        value: true
      }, {
        id:3,
        label: 'c'
      }],
      oldValue: value,
      index: 1,
      selectedIds: [2]
    };

    expect(onChange.calledWith(args)).to.equal(true);

    wrapper.setProps({ value: args.value });

    wrapper.find('Toggle').at(0).simulate('click');

    const args2 = {
      name: 'change',
      value: [{
        id:1,
        label: 'a',
        count: 6,
        value: true
      }, {
        id:2,
        label: 'b',
        value: true
      }, {
        id:3,
        label: 'c'
      }],
      oldValue: [{
        id:1,
        label: 'a',
        count: 6
      }, {
        id:2,
        label: 'b',
        value: true
      }, {
        id:3,
        label: 'c'
      }],
      index: 0,
      selectedIds: [1, 2]
    };

    expect(onChange.calledWith(args2)).to.equal(true);
  });

  it('should behave like a radio button when type is radio', () => {
    const onChange = sinon.spy();

    const wrapper = mount(
      <Group
        name={'radio-group'}
        value={value}
        type={'radio'}
        onChange={onChange}
      />
    );

    wrapper.find('Toggle').at(1).simulate('click');

    const args = {
      name: 'radio-group',
      value: [{
        id:1,
        label: 'a',
        count: 6,
        value: false
      }, {
        id:2,
        label: 'b',
        value: true
      }, {
        id:3,
        label: 'c',
        value: false
      }],
      oldValue: value,
      index: 1,
      selectedIds: [2]
    };

    expect(onChange.calledWith(args)).to.equal(true);

    wrapper.setProps({ value: args.value });

    wrapper.find('Toggle').at(0).simulate('click');

    const args2 = {
      name: 'radio-group',
      value: [{
        id:1,
        label: 'a',
        count: 6,
        value: true
      }, {
        id:2,
        label: 'b',
        value: false
      }, {
        id:3,
        label: 'c',
        value: false
      }],
      oldValue: args.value,
      index: 0,
      selectedIds: [1]
    };

    expect(onChange.calledWith(args2)).to.equal(true);
  });
});
