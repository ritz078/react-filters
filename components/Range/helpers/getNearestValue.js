/**
 * Returns the neares value that can be obtained after clicking on a
 * particular position on the track. Technically finds the nearest
 * slider (upper or lower) and changes the value based on whether the lower or upper
 * slider should move to that position.
 * @param e [Synthetic Event]
 * @param props React Props
 * @param trackWidth width of the track
 * @param trackOffset cached track.getBoundingClientRect()
 * @returns {{value: *[], changed: string}}
 */
export default function (e, props, trackWidth, trackOffset) {
  const { value, max, min } = props;

  const relativeOffset = e.pageX - trackOffset.left;

  const positionOffset = trackWidth / (max - min);
  const nearestValue = Math.round(relativeOffset / positionOffset);
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
}
