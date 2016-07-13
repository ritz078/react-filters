import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { hasStepDifference, suppress, isWithinRange, removeClass, isVertical } from './utils';
import { getValueFromPosition, getRelativePosition, getPositionFromValue } from './helpers';
import autoBind from '../utils/autoBind';

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
    this.controlWidth = this.getControlWidth();
  }

  componentWillReceiveProps (newProps) {
    const propsChanged = (newProps.value !== this.props.value) ||
      (newProps.trackOffset.width !== this.props.trackOffset.width);
    if (propsChanged) this.setSliderPosition(newProps);
  }

  shouldComponentUpdate (newProps) {
    const dimension = constants[newProps.orientation].dimension;

    return (
      (hasStepDifference(newProps.value, this.props.value, newProps.step) &&
      isWithinRange(newProps, newProps.value)) ||
      newProps.trackOffset[dimension] !== this.props.trackOffset[dimension]
    );
  }

  onChange (value, isRenderRequired = false) {
    this.props.onChange({
      controlWidth: this.controlWidth,
      name: this.props.name,
      value
    }, isRenderRequired);
  }

  getControlWidth () {
    const control = this.refs.control;
    if (!control) return 0;
    return control.offsetWidth;
  }

  setSliderPosition (props) {
    const { value } = props;
    this.onChange(value, true);
  }

  handleMouseDown (e) {
    suppress(e);
    this.refs.controlWrapper.className += ' slider-active';
    document.addEventListener('mouseup', this.handleMouseUp);
    if (this.props.readOnly) return;

    document.addEventListener('mousemove', this.handleDrag);
    this.props.onDragExtreme(this.props.name, this.props.value, 'start');
  }

  handleMouseUp (e) {
    suppress(e);
    this.refs.controlWrapper.className = removeClass(this.refs.controlWrapper, 'slider-active');
    document.removeEventListener('mouseup', this.handleMouseUp);

    if (this.props.readOnly) return;

    document.removeEventListener('mousemove', this.handleDrag);
    this.props.onDragExtreme(this.props.name, this.newValue, 'end');
  }

  handleTouchStart () {
    document.addEventListener('touchmove', this.handleDrag);
    document.addEventListener('touchend', this.handleTouchEnd);
    this.props.onDragExtreme(this.props.name, this.props.value, 'start');
  }

  handleTouchEnd () {
    document.removeEventListener('touchmove', this.handleDrag);
    document.removeEventListener('touchend', this.handleTouchEnd);
    this.props.onDragExtreme(this.props.name, this.newValue, 'end');
  }

  handleDrag (e) {
    suppress(e);
    const position = getRelativePosition(e, this.props, this.controlWidth);

    this.newValue = getValueFromPosition(this.props, position);
    this.onChange(this.newValue);
  }

  render () {
    const { name, value, toolTipTemplate, disabled, orientation } = this.props;

    const className = classNames('slider-control', name);

    const sliderPosition = isVertical(orientation) ?
      (100 - getPositionFromValue(this.props)) : getPositionFromValue(this.props);

    let style;

    if (isVertical(orientation)) {
      style = {
        top: `${sliderPosition}%`
      };
    } else {
      style = {
        transform: `translateX(${sliderPosition}%) translate3d(0,0,0)`
      };
    }


    return (
      <div className='slider-slider-wrapper' ref={'controlWrapper'} style={style} >
        <div className='slider-value' >
             {toolTipTemplate(value)}
        </div>
        <div
          className={className}
          draggable='false'
          onMouseDown={!disabled && this.handleMouseDown}
          onTouchStart={!disabled && this.handleTouchStart}
          ref='control'
        ></div>
      </div>
    );
  }
}

Control.propTypes = {
  disabled: PropTypes.bool.isRequired,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onDragExtreme: PropTypes.func.isRequired,
  orientation: PropTypes.string.isRequired,
  readOnly: PropTypes.bool.isRequired,
  step: PropTypes.number.isRequired,
  toolTipTemplate: PropTypes.func.isRequired,
  trackOffset: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired
};
