import React, { PropTypes } from 'react';
import classNames from 'classnames';
import constants from './constants';
import { isVertical } from './utils';

/**
 * Tells whether a particular step comes in between two controls or not
 * @param stepValue value of the position where this step is located
 * @param value Array of control values
 * @returns {boolean}
 */
function isInActiveRange (stepValue, value) {
  return stepValue > value[0] && stepValue < value[1];
}

/**
 * Returns the step position in percentage
 * @param stepValue value of the position where this step is located
 * @param min minimum value of slider
 * @param max maximum value of slider
 * @returns {number}
 */
function getPositionInPercentage (stepValue, min, max) {
  return (stepValue / (max - min)) * 100;
}


/**
 * Array of step elements placed side by side
 * @param props
 * @returns {Array}
 */
function getSteps (props) {
  const { step, min, max, value, isRangeType, orientation } = props;

  const steps = [];
  const totalSteps = ((max - min) / step) + 1;

  for (let i = 0; i < totalSteps; i++) {
    let position = getPositionInPercentage(i * step, min, max);

    if (isVertical(orientation)) position = 100 - position;

    const style = { [constants[orientation].direction]: `${position}%` };

    const className = classNames('slider-step', {
      'slider-step-active': isRangeType && isInActiveRange(i * step, value)
    });

    steps.push(<span style={style} key={i} className={className} />);
  }

  return steps;
}

export default function Steps (props) {
  return (
    <div className='slider-steps-wrapper' onClick={props.onClick} >
         {getSteps(props)}
    </div>
  );
}

Steps.propTypes = {
  isRangeType: PropTypes.bool.isRequired,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  orientation: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired
};

