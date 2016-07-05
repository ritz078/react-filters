import React, { PropTypes } from 'react';
import constants from './constants';

export default function Rail (props) {
  const { value, min, max, orientation } = props;

  const railStyle = {
    [constants[orientation].direction]: `${Math.round((value[0] / max - min) * 100)}%`,
    [constants[orientation].dimension]: `${((value[1] - value[0]) / (max - min)) * 100}%`
  };
  return <div className='rng-rail' style={railStyle} />;
}

Rail.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.array.isRequired,
  orientation: PropTypes.string.isRequired
};
