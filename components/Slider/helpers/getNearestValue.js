import constants from '../constants';
import { capitalize, isVertical } from '../utils';

/**
 * Returns the nearest value that can be obtained after clicking on a
 * particular position on the track. Technically finds the nearest
 * slider (upper or lower) and changes the value based on whether the lower or upper
 * slider should move to that position.
 * @param e [Synthetic Event]
 * @param props React Props
 * @param trackOffset cached track.getBoundingClientRect()
 * @returns {*}
 */
export default function (e, props, trackOffset) {
  const { value, max, min, step, type, orientation } = props;

  let relativeOffset = e[`page${capitalize(constants[orientation].coordinate)}`]
    - trackOffset[constants[orientation].direction];

  if (isVertical(orientation)) relativeOffset = trackOffset.height - relativeOffset;

  const positionOffset = trackOffset[constants[orientation].dimension] / (max - min);
  const nearestIntegerValue = Math.round(relativeOffset / positionOffset);
  const nearestValue = nearestIntegerValue - (nearestIntegerValue % step);
  if (type === 'range') {
    const distancesFromValues = [
      Math.abs(nearestValue - value[0]),
      Math.abs(nearestValue - value[1])
    ];
    return distancesFromValues[0] < distancesFromValues[1] ? ({
      value: [nearestValue, value[1]],
      changed: 'lower'
    }) : ({
      value: [value[0], nearestValue],
      changed: 'upper'
    });
  } else {
    return { value: nearestValue };
  }
}
