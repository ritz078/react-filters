import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import autoBind from '../utils/autoBind';
import lastElement from '../utils/lastElement';

import deepCopy from 'deep-copy';

import Toggle from '../Toggle/index';

function handleSingleSelect (arr, index) {
  return arr.map((val, i) => {
    const obj = val;
    obj.value = (i === index) ? !val.value : false;
    return obj;
  });
}

export default class Group extends Component {
  constructor (props) {
    super(props);

    autoBind([
      'handleChange'
    ], this);
  }

  getElements () {
    const { value, type, mode } = this.props;
    return value.map((val, i) => (
      <Toggle
        {...val}
        key={i}
        mode={mode}
        name={`${type}-${i}`}
        onChange={this.handleChange}
        type={type}
        value={val.value}
      />
    ));
  }

  handleChange (data) {
    const { name, value, type } = this.props;
    let newValue = deepCopy(value);

    const index = parseInt(lastElement(data.name.split('-')), 10);

    if (type === 'checkbox' || type === 'switch') {
      newValue[index].value = data.value;
    } else {
      newValue = handleSingleSelect(newValue, index);
    }

    this.props.onChange({
      index,
      name,
      oldValue: value,
      value: newValue
    });
  }

  render () {
    const { name, className, attributes, type } = this.props;
    const mainClass = classNames('rf-group', `${type}-group`, name, className);
    return (
      <div {...attributes} className={mainClass}>
        {this.getElements()}
      </div>
    );
  }
}

Group.propTypes = {
  attributes: PropTypes.object,
  className: PropTypes.string,
  mode: PropTypes.oneOf(['normal', 'tag']),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf([
    'radio', 'checkbox', 'switch'
  ]),
  value: PropTypes.arrayOf(
    PropTypes.shape({
      count: PropTypes.number,
      label: PropTypes.string,
      value: PropTypes.bool
    })
  )
};
