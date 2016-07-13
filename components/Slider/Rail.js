import React, { PropTypes } from 'react';
import { isVertical } from './utils';
import constants from './constants';

/**
 * Returns rail's position value of `left` for horizontal slider and `top`
 * for vertical slider
 * @param value
 * @param min
 * @param max
 * @param orientation
 * @returns {number} Value in Percentage
 */
function getDirectionPositionForRange (value, min, max, orientation) {
  return isVertical(orientation) ? (
    // as upper value is used to calculate `top`;
    Math.round(((max - value[1]) / max - min) * 100)
  ) : (
    Math.round((value[0] / max - min) * 100)
  );
}

export default function Rail (props) {
  const { value, min, max, orientation, isRangeType } = props;

  const difference = isRangeType ? (value[1] - value[0]) : value;
  const dimensionValue = (difference / (max - min)) * 100;

  const directionValue = getDirectionPositionForRange(value, min, max, orientation);

  const railStyle = {
    [constants[orientation].direction]: `${directionValue}%`,
    [constants[orientation].dimension]: `${dimensionValue}%`
  };

  if (!isRangeType) {
    railStyle[isVertical(orientation) ? 'bottom' : 'left'] = 0;
    if (isVertical(orientation)) {
      railStyle.top = `${100 - dimensionValue}%`;
    } else {
      railStyle.left = 0;
    }
  }

  return <div className='slider-rail' style={railStyle} />;
}

Rail.propTypes = {
  isRangeType: PropTypes.bool.isRequired,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  orientation: PropTypes.string.isRequired,
  value: PropTypes.array.isRequired
};
