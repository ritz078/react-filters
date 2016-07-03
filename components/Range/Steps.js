import React, { PropTypes } from 'react';
import classNames from 'classnames';

function isInActiveRange (stepValue, value) {
  return stepValue > value[0] && stepValue < value[1];
}

function getPositionInPercentage (stepValue, min, max) {
  return (stepValue / (max - min)) * 100;
}

function getSteps (props) {
  const { step, min, max, value } = props;

  const steps = [];
  const totalSteps = ((max - min) / step) + 1;

  for (let i = 0; i < totalSteps; i++) {
    const style = {
      left: `${getPositionInPercentage(i * step, min, max)}%`
    };

    const className = classNames('rng-step', {
      'rng-step-active': isInActiveRange(i * step, value)
    });

    steps.push(<span style={style} key={i} className={className} />);
  }

  return steps;
}

export default function Steps (props) {
  return (
    <div className='rng-steps-wrapper' onClick={props.onClick}>
         {getSteps(props)}
    </div>
  );
}

Steps.propTypes = {
  step: PropTypes.number.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  onClick: PropTypes.func.isRequired
};

