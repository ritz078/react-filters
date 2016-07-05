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
  } else {
    return true;
  }
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
    return inRange(newProps.value, newProps) &&
      (newProps.value !== this.props.value);
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
    const { name, disabled, value, prefix, suffix } = this.props;
    const mainClass = classNames('react-filters', 'rf-count', name, { disabled });
    return (
      <div className={mainClass}>
        <button
          className='count-button cb-lower'
          onClick={!disabled && this.handleDecrement}
        >
          <i className='icon-remove' />
        </button>
        <div className='count-value'>
          <span className='count-prefix'>{prefix}</span>
             {value}
          <span className='count-suffix'>{suffix}</span>
        </div>
        <button
          className='count-button cb-upper'
          onClick={!disabled && this.handleIncrement}
        >
          <i className='icon-add' />
        </button>
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
  step: PropTypes.number
};

Count.defaultProps = {
  disabled: false,
  value: 0,
  min: null,
  max: null,
  step: 1
};
