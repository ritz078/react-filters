import React, { PropTypes } from 'react';

export default function Rail (props) {
  const { value, min, max } = props;

  const railStyle = {
    left: `${Math.round((value[0] / max - min) * 100)}%`,
    width: `${((value[1] - value[0]) / (max - min)) * 100}%`
  };
  return <div className='rng-rail' style={railStyle} />;
}

Rail.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.array.isRequired
};
