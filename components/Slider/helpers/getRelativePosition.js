import { capitalize } from '../utils';
import constants from '../constants';

export default function (e, props, sliderWidth) {
  // Get the offset DIRECTION relative to the viewport

  const coordinate = constants[props.orientation].coordinate;
  const direction = constants[props.orientation].direction;
  const ucCoordinate = capitalize(coordinate);
  const trackPos = props.trackOffset[direction];

  let btnPos = 0;

  if (typeof e[`page${ucCoordinate}`] !== 'undefined') {
    btnPos = e[`page${ucCoordinate}`];
  } else if (e && typeof e[`client${ucCoordinate}`] !== 'undefined') {
    btnPos = e[`client${ucCoordinate}`];
  } else if (e.touches && e.touches[0] &&
    typeof e.touches[0][`client${ucCoordinate}`] !== 'undefined') {
    btnPos = e.touches[0][`client${ucCoordinate}`];
  }

  return btnPos - trackPos - sliderWidth / 2;
}
