import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import { getSliderLength, isWithinRange, suppress, isArrayEqual } from './utils';
import getNearestValue from './helpers/getNearestValue';
import Slider from './Slider';
import autoBind from './utils/autoBind';

export default class Range extends Component {
  constructor (props) {
    super(props);

    this.state = {
      sliderLowerPosition: 0,
      sliderUpperPosition: 0,
      trackWidth: 0
    };

    autoBind([
      'onChange',
      'onSliderChange',
      'handleClick',
      'updatePosition'
    ], this);
  }

  componentDidMount () {
    this.updatePosition();
    window.addEventListener('resize', this.updatePosition);
  }

  componentWillReceiveProps () {
    this.updatePosition();
  }

  shouldComponentUpdate (newProps, newState) {
    return isWithinRange(newProps, newProps.value) &&
      (!isArrayEqual(this.props.value, newProps.value) ||
      this.state.trackWidth !== newState.trackWidth || !!this.isRerenderRequired);
  }

  componentDidUpdate () {
    this.isRerenderRequired = false;
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updatePosition);
  }

  onChange (value, changed) {
    this.props.onChange({
      name: this.props.name,
      value,
      changed
    });
  }

  onSliderChange (data, isRerenderRequired) {
    const value = data.name === 'lower' ? [data.value, this.props.value[1]] :
      [this.props.value[0], data.value];

    // only trigger on first onChange trigger
    this.isRerenderRequired = isRerenderRequired;

    this.setState(() => (
      (data.name === 'lower') ? {
        sliderLowerPosition: data.position + data.sliderWidth / 2
      } : {
        sliderUpperPosition: data.position + data.sliderWidth / 2
      }), () => {
      if (isWithinRange(this.props, value) && !isArrayEqual(this.props.value, value)) {
        this.onChange(value, data.name);
      }
    });
  }

  handleClick (e) {
    suppress(e);
    const newData = getNearestValue(e, this.refs.track, this.props);
    this.onChange(newData.value, newData.changed);
  }

  updatePosition () {
    getSliderLength.width = this.refs.track.clientWidth;

    this.setState({
      trackWidth: getSliderLength.width
    });
  }

  render () {
    const {
      name,
      disabled,
      step,
      orientation,
      min,
      max,
      precision,
      value
    } = this.props;

    const mainClass = classNames('react-filters', 'rf-range', name, {
      'rng-disabled': disabled
    });

    const railStyle = {
      left: this.state.sliderLowerPosition,
      right: this.state.trackWidth - this.state.sliderUpperPosition
    };

    return (
      <div className={mainClass}>
        <div className='rng-wrapper'>
          <div className='rng-track' ref='track' onClick={this.handleClick}>
            <div className='rng-rail' style={railStyle}/>
          </div>
          <Slider
            value={value[0]}
            name={'lower'}
            step={step}
            orientation={orientation}
            track={this.refs.track}
            trackLength={this.state.trackWidth}
            onChange={this.onSliderChange}
            min={min}
            max={max}
            precision={precision}
          />
          <Slider
            value={value[1]}
            name={'upper'}
            step={step}
            orientation={orientation}
            track={this.refs.track}
            trackLength={this.state.trackWidth}
            onChange={this.onSliderChange}
            min={min}
            max={max}
            precision={precision}
          />
        </div>
      </div>
    );
  }
}

Range.propTypes = {
  disabled: PropTypes.bool,
  max: PropTypes.number,
  min: PropTypes.number,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  orientation: PropTypes.string,
  precision: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.array
};

Range.defaultProps = {
  disabled: false,
  max: 20,
  min: 0,
  orientation: 'horizontal',
  precision: 0,
  step: 1,
  value: [5, 10]
};
