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
function getDirectionPosition (value, min, max, orientation) {
  return isVertical(orientation) ? (
    // as upper value is used to calculate `top`;
    Math.round(((max - value[1]) / max - min) * 100)
  ) : (
    Math.round((value[0] / max - min) * 100)
  );
}

export default function Rail (props) {
  const { value, min, max, orientation } = props;

  const dimensionValue = ((value[1] - value[0]) / (max - min)) * 100;

  const directionValue = getDirectionPosition(value, min, max, orientation);

  const railStyle = {
    [constants[orientation].direction]: `${directionValue}%`,
    [constants[orientation].dimension]: `${dimensionValue}%`
  };
  return <div className='slider-rail' style={railStyle} />;
}

Rail.propTypes = {
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  orientation: PropTypes.string.isRequired,
  value: PropTypes.array.isRequired
};
