import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { autoBind, hasStepDifference, suppress } from './utils';
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
      'handleTouchEnd'
    ], this);
  }

  componentDidMount () {
    this.setSliderPosition(this.props, true);
  }

  componentWillReceiveProps (newProps) {
    const flag = newProps.value !== this.props.value;
    this.setSliderPosition(newProps, flag);
  }

  shouldComponentUpdate (newProps) {
    return hasStepDifference(newProps.value, this.props.value, newProps.step) ||
      newProps.trackLength !== this.props.trackLength;
  }

  setSliderPosition (props, flag) {
    const { value, max, min, trackLength, onChange, name } = props;
    this.setState({
      sliderPosition: getPositionFromValue(value, max, min, trackLength, this.refs.slider)
    }, () => {
      if (flag) {
        onChange({
          name,
          value,
          position: this.state.sliderPosition,
          sliderWidth: this.refs.slider.clientWidth
        });
      }
    });
  }

  handleMouseDown () {
    document.addEventListener('mousemove', this.handleDrag);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseUp () {
    document.removeEventListener('mousemove', this.handleDrag);
    document.removeEventListener('mouseup', this.handleMouseUp);
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
    const { name, step, onChange, value } = this.props;
    suppress(e);
    // step to precision
    const position = getRelativePosition(e, this.props, this.refs.slider);
    const newValue = Math.round(getValueFromPosition(this.props, position));

    if (hasStepDifference(newValue, value, step)) {
      onChange({
        name,
        value: newValue,
        position,
        sliderWidth: this.refs.slider.clientWidth
      });
    }
  }

  render () {
    const { name } = this.props;

    const className = classNames('rng-slider', name);
    return (
      <div
        draggable='false'
        className={className}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleTouchStart}
        ref='slider'
        style={{ marginLeft: this.state.sliderPosition }}
      ></div>
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
  trackLength: PropTypes.number.isRequired
};
