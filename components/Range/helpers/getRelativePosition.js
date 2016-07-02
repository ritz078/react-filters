import { capitalize } from '../utils';

const constants = {
  orientation: {
    horizontal: {
      dimension: 'width',
      direction: 'left',
      coordinate: 'x'
    },
    vertical: {
      dimension: 'height',
      direction: 'top',
      coordinate: 'y'
    }
  }
};

let trackPos = null;

export default function (e, props, sliderWidth) {
  // Get the offset DIRECTION relative to the viewport

  const coordinate = constants.orientation[props.orientation].coordinate;
  const direction = constants.orientation[props.orientation].direction;
  const ucCoordinate = capitalize(coordinate);
  trackPos = trackPos || props.trackOffset[direction];

  let btnPos = 0;

  if (typeof e[`page${ucCoordinate}`] !== 'undefined') {
    btnPos = e[`page${ucCoordinate}`];
  } else if (e && typeof e[`client${ucCoordinate}`] !== 'undefined') {
    btnPos = e[`client${ucCoordinate}`];
  } else if (e.touches && e.touches[0] &&
    typeof e.touches[0][`client${ucCoordinate}`] !== 'undefined') {
    btnPos = e.touches[0][`client${ucCoordinate}`];
  } else if (e.currentPoint && typeof e.currentPoint[this.COORDINATE] !== 'undefined') {
    btnPos = e.currentPoint[this.COORDINATE];
  }

  return btnPos - trackPos - sliderWidth / 2;
}
