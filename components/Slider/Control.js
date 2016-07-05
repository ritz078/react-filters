import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { hasStepDifference, suppress, isWithinRange, removeClass } from './utils';
import { getValueFromPosition, getRelativePosition, getPositionFromValue } from './helpers';
import autoBind from '../utils/autoBind';

import { capitalize } from './utils';
import constants from './constants';

export default class Control extends Component {
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
    this.sliderWidth = this.getSliderWidth();
  }

  componentWillReceiveProps (newProps) {
    const propsChanged = (newProps.value !== this.props.value) ||
      (newProps.trackOffset.width !== this.props.trackOffset.width);
    if (propsChanged) this.setSliderPosition(newProps);
  }

  shouldComponentUpdate (newProps) {
    const dimension = constants[newProps.orientation].dimension;
    
    return (hasStepDifference(newProps.value, this.props.value, newProps.step) &&
      isWithinRange(newProps, newProps.value)) ||
      newProps.trackOffset[dimension] !== this.props.trackOffset[dimension];
  }

  onChange (value, isRerenderRequired = false) {
    this.props.onChange({
      name: this.props.name,
      value,
      sliderWidth: this.sliderWidth
    }, isRerenderRequired);
  }

  getSliderWidth () {
    const slider = this.refs.slider;
    if (!slider) return 0;
    return slider.offsetWidth;
  }

  setSliderPosition (props) {
    const { value } = props;
    this.onChange(value, true);
  }

  handleMouseDown (e) {
    suppress(e);
    this.refs.sliderWrapper.className += ' rng-active';
    document.addEventListener('mouseup', this.handleMouseUp);
    if (this.props.readOnly) return;

    document.addEventListener('mousemove', this.handleDrag);
  }

  handleMouseUp (e) {
    suppress(e);
    this.refs.sliderWrapper.className = removeClass(this.refs.sliderWrapper, 'rng-active');
    document.removeEventListener('mouseup', this.handleMouseUp);

    if (this.props.readOnly) return;

    document.removeEventListener('mousemove', this.handleDrag);
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
    const position = getRelativePosition(e, this.props, this.sliderWidth);

    const newValue = getValueFromPosition(this.props, position);
    this.onChange(newValue);
  }

  render () {
    const { name, value, valueFormat, disabled, orientation, trackOffset } = this.props;

    const className = classNames('rng-control', name);

    const sliderPosition = (orientation === 'vertical') ?
      (trackOffset.height - getPositionFromValue(this.props)) : getPositionFromValue(this.props);

    const style = {
      transform: `translate${capitalize(constants[orientation].coordinate)}(${sliderPosition}px)
      translate3d(0,0,0)`
    };

    return (
      <div className='rng-slider-wrapper' ref={'sliderWrapper'} style={style} >
        <div className='rng-value' >
             {valueFormat(value)}
        </div>
        <div
          draggable='false'
          className={className}
          onMouseDown={!disabled && this.handleMouseDown}
          onTouchStart={!disabled && this.handleTouchStart}
          ref='slider'
        ></div>
      </div>
    );
  }
}

Control.propTypes = {
  onChange: PropTypes.func,
  step: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  orientation: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  trackOffset: PropTypes.object.isRequired,
  valueFormat: PropTypes.func,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool
};

Control.defaultProps = {
  valueFormat (value) {
    return value;
  }
};
