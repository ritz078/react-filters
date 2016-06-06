/**
 * Returns the neares value that can be obtained after clicking on a
 * particular position on the track. Technically finds the nearest
 * slider (upper or lower) and changes the value based on whether the lower or upper
 * slider should move to that position.
 * @param e [Synthetic Event]
 * @param track The reference to the track element
 * @param props React Props
 * @returns {{value: *[], changed: string}}
 */
export default function (e, track, props) {
  const { value, max, min } = props;
  const trackOffsetLeft = track.getBoundingClientRect().left;
  const relativeOffset = e.pageX - trackOffsetLeft;

  const positionOffset = track.clientWidth / (max - min);
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
