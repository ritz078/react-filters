import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { autoBind, hasStepDifference, suppress, isWithinRange, removeClass } from './utils';
import { getValueFromPosition, getRelativePosition, getPositionFromValue } from './helpers';

export default class Slider extends Component {
  constructor (props, context) {
    super(props, context);

    this.state = {
      sliderPosition: 0
    };

    autoBind([
      'handleMouseDown',
      'handleDrag',
      'handleMouseUp',
      'handleTouchStart',
      'handleTouchEnd',
      'onChange'
    ], this);
  }

  componentDidMount () {
    this.setSliderPosition(this.props, true);
  }

  componentWillReceiveProps (newProps) {
    const propsChanged = (newProps.value !== this.props.value) ||
      (newProps.trackLength !== this.props.trackLength);
    this.setSliderPosition(newProps, propsChanged);
  }

  shouldComponentUpdate (newProps) {
    return (hasStepDifference(newProps.value, this.props.value, newProps.step) &&
      isWithinRange(newProps, newProps.value)) ||
      newProps.trackLength !== this.props.trackLength;
  }

  onChange (value, position, isRerenderRequired = false) {
    this.props.onChange({
      name: this.props.name,
      value,
      position,
      sliderWidth: this.refs.slider.clientWidth
    }, isRerenderRequired);
  }

  setSliderPosition (props, propsChanged) {
    if (propsChanged) {
      const { value } = props;
      this.setState({
        sliderPosition: getPositionFromValue(props, this.refs.slider)
      }, () => this.onChange(value, this.state.sliderPosition, true));
    }
  }

  handleMouseDown () {
    document.addEventListener('mousemove', this.handleDrag);
    document.addEventListener('mouseup', this.handleMouseUp);
    this.refs.slider.className += ' rng-active';
  }

  handleMouseUp () {
    document.removeEventListener('mousemove', this.handleDrag);
    document.removeEventListener('mouseup', this.handleMouseUp);
    this.refs.slider.className = removeClass(this.refs.slider, 'rng-active');
  }

  handleTouchStart () {
    document.addEventListener('touchmove', this.handleDrag);
    document.addEventListener('touchend', this.handleTouchEnd);
  }

  handleTouchEnd () {
    document.removeEventListener('touchmove', this.handleDrag);
    document.removeEventListener('touchend', this.handleTouchEnd);
  }

  handleDrag (e) {
    suppress(e);

    const { step, value, max, min, trackLength } = this.props;
    const position = getRelativePosition(e, this.props, this.refs.slider);
    const positionStep = trackLength / max - min;

    if (Math.abs(position - this.state.sliderPosition) >= positionStep) {
      const newValue = Math.round(getValueFromPosition(this.props, position));

      if (hasStepDifference(newValue, value, step) && isWithinRange(this.props, newValue)) {
        this.onChange(newValue, position);
      }
    }
  }

  render () {
    const { name, value, valueFormat } = this.props;

    const className = classNames('rng-slider', name);
    return (
      <div className='rng-slider-wrapper'>
        <div
          className='rng-value'
          style={{ left: this.state.sliderPosition }}
        >
          {valueFormat(value)}
        </div>
        <div
          draggable='false'
          className={className}
          onMouseDown={this.handleMouseDown}
          onTouchStart={this.handleTouchStart}
          ref='slider'
          style={{ marginLeft: this.state.sliderPosition }}
        ></div>
      </div>
    );
  }
}

Slider.propTypes = {
  onChange: PropTypes.func,
  step: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  orientation: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  trackLength: PropTypes.number.isRequired,
  valueFormat: PropTypes.func
};

Slider.defaultProps = {
  valueFormat (value) {
    return value;
  }
};
