import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';

import autoBind from '../utils/autoBind';

function inRange (value, props) {
  const { min, max } = props;
  if (min !== null && max !== null) {
    return value >= min && value <= max;
  } else if (min) {
    return value >= min;
  } else if (max) {
    return value <= max;
  }
  return true;
}

export default class Count extends Component {
  constructor (props) {
    super(props);

    autoBind([
      'handleIncrement',
      'handleDecrement',
      'onChange'
    ], this);
  }

  shouldComponentUpdate (newProps) {
    return inRange(newProps.value, newProps) && (newProps.value !== this.props.value);
  }

  onChange (value, action) {
    if (inRange(value, this.props)) {
      const { name, onChange } = this.props;
      onChange({
        name,
        value,
        action
      });
    }
  }

  handleDecrement () {
    this.onChange(this.props.value - this.props.step, 'decreased');
  }

  handleIncrement () {
    this.onChange(this.props.value + this.props.step, 'increased');
  }

  render () {
    const {
      name,
      disabled,
      value,
      prefix,
      suffix,
      decrementElement,
      incrementElement
    } = this.props;

    const mainClass = classNames('react-filters', 'rf-count', name, { disabled });
    return (
      <div className={mainClass} >
        <div
          className='count-button-wrapper cb-lower'
          onClick={!disabled && this.handleDecrement}
        >
          {decrementElement(this.props)}
        </div>

        <div className='count-value' >
          <span className='count-prefix' >{prefix}</span>
             {value}
          <span className='count-suffix' >{suffix}</span>
        </div>
        <div
          className='count-button-wrapper cb-upper'
          onClick={!disabled && this.handleIncrement}
        >
          {incrementElement(this.props)}
        </div>
      </div>
    );
  }
}

Count.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  step: PropTypes.number,
  decrementElement: PropTypes.func,
  incrementElement: PropTypes.func
};

Count.defaultProps = {
  disabled: false,
  value: 0,
  min: null,
  max: null,
  step: 1,
  decrementElement () {
    return (
      <button className='count-button' >
        <i className='icon-remove' />
      </button>
    );
  },
  incrementElement () {
    return (
      <button className='count-button' >
        <i className='icon-add' />
      </button>
    );
  }
};
