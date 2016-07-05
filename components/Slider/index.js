import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import { isWithinRange, suppress, isEqual, isVertical } from './utils';
import getNearestValue from './helpers/getNearestValue';
import Control from './Control';
import Steps from './Steps';
import Rail from './Rail';
import autoBind from '../utils/autoBind';

export default class Slider extends Component {
  constructor (props) {
    super(props);

    this.state = {
      trackOffset: {}
    };

    autoBind([
      'onChange',
      'onControlChange',
      'handleClick',
      'updatePosition'
    ], this);
  }

  componentDidMount () {
    this.updatePosition();
    window.addEventListener('resize', this.updatePosition);
  }

  shouldComponentUpdate (newProps, newState) {
    return isWithinRange(newProps, newProps.value) &&
      (!isEqual(this.props.value, newProps.value) || !!this.isRerenderRequired ||
      this.state.trackOffset.width !== newState.trackOffset.width);
  }

  componentDidUpdate () {
    this.isRerenderRequired = false;
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updatePosition);
  }

  onChange (value, changed) {
    const args = {
      name: this.props.name,
      value
    };

    if (changed) args.changed = changed;
    this.props.onChange(args);
  }

  onControlChange (data, isRerenderRequired) {
    let value;
    if (!this.isRangeType()) {
      value = data.value;
    } else {
      value = data.name === 'lower' ? [data.value, this.props.value[1]] :
        [this.props.value[0], data.value];
    }

    // only trigger on first onChange trigger
    this.isRerenderRequired = isRerenderRequired;

    if (isWithinRange(this.props, value) && !isEqual(this.props.value, value)) {
      this.onChange(value, data.name);
    }
  }

  getTrackOffset () {
    return this.state.trackOffset;
  }

  getControl (value, name) {
    const { step, orientation, min, max, precision, readOnly, disabled } = this.props;
    return (
      <Control
        value={value}
        name={name}
        step={step}
        orientation={orientation}
        trackOffset={this.getTrackOffset()}
        onChange={this.onControlChange}
        min={min}
        max={max}
        precision={precision}
        readOnly={readOnly}
        disabled={disabled}
      />
    );
  }

  updatePosition () {
    const track = this.refs.track;

    setTimeout(() => {
      window.requestAnimationFrame(() => {
        this.setState({
          trackOffset: track ? track.getBoundingClientRect() : {}
        });
      });
    });
  }

  handleClick (e) {
    suppress(e);
    const newData = getNearestValue(e, this.props, this.getTrackOffset());
    this.onChange(newData.value, newData.changed);
  }

  isRangeType () {
    return this.props.type === 'range';
  }

  render () {
    const {
      name,
      disabled,
      step,
      min,
      max,
      value,
      rangeTemplate,
      showSteps,
      orientation
    } = this.props;

    const mainClass = classNames('react-filters', 'rf-range', name, {
      'rng-disabled': disabled,
      'rng-vertical': isVertical(this.props)
    });

    const lowerValue = this.isRangeType() ? value[0] : value;

    return (
      <div className={mainClass} >
        <div className='rng-wrapper' >
          <div
            className='rng-track'
            ref='track'
            onClick={!disabled && !showSteps && this.handleClick}
          >
            {this.isRangeType() && <Rail
              min={min}
              max={max}
              value={value}
              orientation={orientation}
            />}
          </div>
             {
               showSteps && <Steps
                 step={step}
                 min={min}
                 max={max}
                 value={value}
                 onClick={this.handleClick}
                 isRangeType={this.isRangeType()}
                 orientation={orientation}
               />
             }

             {this.getControl(lowerValue, 'lower')}
             {this.isRangeType() && this.getControl(value[1], 'upper')}

        </div>
           {rangeTemplate(min, max)}
      </div>
    );
  }
}

Slider.propTypes = {
  disabled: PropTypes.bool,
  max: PropTypes.number,
  min: PropTypes.number,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  precision: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
  rangeTemplate: PropTypes.func,
  readOnly: PropTypes.bool,
  showSteps: PropTypes.bool,
  type: PropTypes.oneOf(['value', 'range'])
};

Slider.defaultProps = {
  disabled: false,
  max: 20,
  min: 0,
  orientation: 'horizontal',
  precision: 0,
  step: 1,
  value: [5, 10],
  readOnly: false,
  showSteps: false,
  type: 'value',
  rangeTemplate (min, max) {
    return (
      <div className='rng-range' >
        <div className='rng-range-min' >{min}</div>
        <div className='rng-range-max' >{max}</div>
      </div>
    );
  }
};
