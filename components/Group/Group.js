import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import autoBind from '../utils/autoBind';
import lastElement from '../utils/lastElement';

import Toggle from '../Toggle/Toggle';

function handleSingleSelect (arr, index) {
  return arr.map((val, i) => {
    const obj = val;
    obj.value = (i === index) ? !val.value : false;
    return obj;
  });
}

export default class RadioGroup extends Component {
  constructor (props) {
    super(props);

    autoBind([
      'handleChange'
    ], this);
  }

  getElements () {
    const { value, type } = this.props;
    return value.map((val, i) => (
      <Toggle
        type={type}
        {...val}
        name={`${type}-${i}`}
        onChange={this.handleChange}
        value={val.value}
      />
    ));
  }

  handleChange (data) {
    const { name, value, type } = this.props;
    let newValue = value;
    const index = parseInt(lastElement(data.name.split('-')), 10);
    if (type === 'checkbox' || type === 'switch') {
      newValue[index].value = data.value;
    } else {
      newValue = handleSingleSelect(value, index);
    }
    this.props.onChange({
      name,
      value: newValue,
      index
    });
  }

  render () {
    const { name, className, attributes } = this.props;
    const mainClass = classNames('radio-group', name, className);
    return (
      <div className={mainClass} {...attributes}>
           {this.getElements()}
      </div>
    );
  }
}

RadioGroup.propTypes = {
  attributes: PropTypes.object,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(),
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf([
    'radio', 'checkbox', 'switch'
  ])
};
