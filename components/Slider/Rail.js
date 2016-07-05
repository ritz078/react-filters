import React, { PropTypes } from 'react';
import constants from './constants';

export default function Rail (props) {
  const { value, min, max, orientation } = props;

  const dimensionValue = ((value[1] - value[0]) / (max - min)) * 100;

  const directionValue = orientation === 'vertical' ? (
    Math.round(((max - value[1]) / max - min) * 100) // as upper value is used to calculate `top`;
  ) : (
    Math.round((value[0] / max - min) * 100)
  );

  const railStyle = {
    [constants[orientation].direction]: `${directionValue}%`,
    [constants[orientation].dimension]: `${dimensionValue}%`
  };
  return <div className='rng-rail' style={railStyle} />;
}

Rail.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.array.isRequired,
  orientation: PropTypes.string.isRequired
};
