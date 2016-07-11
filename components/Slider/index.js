import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import { isWithinRange, suppress, isEqual, isVertical, formatValue, capitalize } from './utils';
import { getNearestValue } from './helpers';
import Control from './Control';
import Steps from './Steps';
import Rail from './Rail';
import autoBind from '../utils/autoBind';
import noop from '../utils/noop';

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
      'updatePosition',
      'onDragExtreme'
    ], this);
  }

  componentDidMount () {
    this.updatePosition();
    window.addEventListener('resize', this.updatePosition);
  }

  shouldComponentUpdate (newProps, newState) {
    return (
      isWithinRange(newProps, newProps.value) &&
      (!isEqual(this.props.value, newProps.value) || !!this.isRerenderRequired ||
      this.state.trackOffset.width !== newState.trackOffset.width)
    );
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

  onControlChange (data, isRenderRequired) {
    let value;
    if (this.isRangeType()) {
      value = formatValue(this.props.value, data.value, data.name, this.props.type);
    } else {
      value = data.value;
    }

    // only trigger on first onChange trigger
    this.isRerenderRequired = isRenderRequired;

    if (isWithinRange(this.props, value) && !isEqual(this.props.value, value)) {
      this.onChange(value, data.name);
    }
  }

  onDragExtreme (name, value, action) {
    const newValue = formatValue(this.props.value, value, name, this.props.type);
    this.props[`onDrag${capitalize(action)}`]({
      changed: name,
      name: this.props.name,
      value: newValue
    });
  }

  getControl (value, name) {
    const {
      step,
      orientation,
      min,
      max,
      readOnly,
      disabled,
      toolTipTemplate
    } = this.props;

    return (
      <Control
        disabled={disabled}
        max={max}
        min={min}
        name={name}
        onChange={this.onControlChange}
        onDragExtreme={this.onDragExtreme}
        orientation={orientation}
        readOnly={readOnly}
        step={step}
        toolTipTemplate={toolTipTemplate}
        trackOffset={this.getTrackOffset()}
        value={value}
      />
    );
  }

  getTrackOffset () {
    return this.state.trackOffset;
  }

  updatePosition () {
    const track = this.refs.track;

    setTimeout(() => {
      window.requestAnimationFrame(() => {
        this.setState({
          trackOffset: track ? track.getBoundingClientRect() : {}
        });
      });
    }, 0);
  }

  handleClick (e) {
    suppress(e);
    const newData = getNearestValue(e, this.props, this.getTrackOffset());
    this.onChange(newData.value, newData.changed);
    this.onDragExtreme(newData.changed, newData.value, 'end');
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
      orientation,
      attributes
    } = this.props;

    const mainClass = classNames('react-filters', 'rf-slider', name, {
      'slider-disabled': disabled,
      'slider-vertical': isVertical(orientation)
    });

    const lowerValue = this.isRangeType() ? value[0] : value;

    return (
      <div {...attributes} className={mainClass}>
        <div className='slider-wrapper' >
          <div
            className='slider-track'
            onClick={!disabled && !showSteps && this.handleClick}
            ref='track'
          >
            {
              this.isRangeType() && <Rail
                max={max}
                min={min}
                orientation={orientation}
                value={value}
              />
            }

          </div>
          {
            showSteps && <Steps
              isRangeType={this.isRangeType()}
              max={max}
              min={min}
              onClick={this.handleClick}
              orientation={orientation}
              step={step}
              value={value}
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
  attributes: PropTypes.object,
  disabled: PropTypes.bool,
  max: PropTypes.number,
  min: PropTypes.number,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragStart: PropTypes.func,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  rangeTemplate: PropTypes.func,
  readOnly: PropTypes.bool,
  showSteps: PropTypes.bool,
  step: PropTypes.number,
  toolTipTemplate: PropTypes.func,
  type: PropTypes.oneOf(['value', 'range']),
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.number])
};

Slider.defaultProps = {
  attributes: {},
  disabled: false,
  max: 20,
  min: 0,
  onDragEnd: noop,
  onDragStart: noop,
  orientation: 'horizontal',
  rangeTemplate (min, max) {
    return (
      <div className='slider-range' >
        <div className='slider-range-min' >{min}</div>
        <div className='slider-range-max' >{max}</div>
      </div>
    );
  },
  readOnly: false,
  showSteps: false,
  step: 1,
  toolTipTemplate (value) {
    return value;
  },
  type: 'value',
  value: [5, 10]
};
