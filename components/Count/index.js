import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';

import autoBind from '../utils/autoBind';

function inRange (value, min, max) {
  return value >= min && value <= max;
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
    const { value, min, max } = newProps;
    return (
      inRange(value, min, max) &&
      (value !== this.props.value)
    );
  }

  onChange (value, action) {
    const { name, onChange, min, max } = this.props;

    if (inRange(value, min, max)) {
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
  decrementElement: PropTypes.func,
  disabled: PropTypes.bool,
  incrementElement: PropTypes.func,
  max: PropTypes.number,
  min: PropTypes.number,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  prefix: PropTypes.string,
  step: PropTypes.number,
  suffix: PropTypes.string,
  value: PropTypes.number
};

Count.defaultProps = {
  decrementElement () {
    return (
      <button className='count-button' >
        <i className='icon-remove' />
      </button>
    );
  },
  disabled: false,
  incrementElement () {
    return (
      <button className='count-button' >
        <i className='icon-add' />
      </button>
    );
  },
  max: Number.POSITIVE_INFINITY,
  min: Number.NEGATIVE_INFINITY,
  step: 1,
  value: 0
};
