import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { hasStepDifference, suppress, isWithinRange, removeClass } from './utils';
import { getValueFromPosition, getRelativePosition, getPositionFromValue } from './helpers';
import autoBind from '../utils/autoBind';

export default class Slider extends Component {
  constructor (props, context) {
    super(props, context);

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
    this.setSliderPosition(this.props);
  }

  componentWillReceiveProps (newProps) {
    const propsChanged = (newProps.value !== this.props.value) ||
      (newProps.trackLength !== this.props.trackLength);
    if (propsChanged) this.setSliderPosition(newProps);
  }

  shouldComponentUpdate (newProps) {
    return (hasStepDifference(newProps.value, this.props.value, newProps.step) &&
      isWithinRange(newProps, newProps.value)) ||
      newProps.trackLength !== this.props.trackLength;
  }

  onChange (value, isRerenderRequired = false) {
    this.props.onChange({
      name: this.props.name,
      value,
      sliderWidth: this.getSliderWidth()
    }, isRerenderRequired);
  }

  getSliderWidth () {
    const slider = this.refs.slider;
    if (!slider) return 0;
    return slider.clientWidth;
  }

  setSliderPosition (props) {
    const { value } = props;
    this.onChange(value, true);
  }

  handleMouseDown (e) {
    suppress(e);
    document.addEventListener('mousemove', this.handleDrag);
    document.addEventListener('mouseup', this.handleMouseUp);
    this.refs.sliderWrapper.className += ' rng-active';
  }

  handleMouseUp (e) {
    suppress(e);
    document.removeEventListener('mousemove', this.handleDrag);
    document.removeEventListener('mouseup', this.handleMouseUp);
    this.refs.sliderWrapper.className = removeClass(this.refs.sliderWrapper, 'rng-active');
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

    const position = getRelativePosition(e, this.props, this.getSliderWidth());

    const newValue = getValueFromPosition(this.props, position);
    this.onChange(newValue);
  }

  render () {
    const { name, value, valueFormat } = this.props;

    const className = classNames('rng-slider', name);

    const sliderPosition = getPositionFromValue(this.props, this.getSliderWidth());

    const style = {
      transform: `translateX(${sliderPosition}%) translate3d(0,0,0)`
    };

    return (
      <div className='rng-slider-wrapper' ref={'sliderWrapper'} style={style}>
        <div className='rng-value'>
          {valueFormat(value)}
        </div>
        <div
          draggable='false'
          className={className}
          onMouseDown={this.handleMouseDown}
          onTouchStart={this.handleTouchStart}
          ref='slider'
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
