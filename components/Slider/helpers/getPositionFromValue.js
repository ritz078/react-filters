import constants from '../constants';

export default function (props) {
  const { min, max, value, trackOffset, orientation } = props;
  return ((value / (max - min))) * trackOffset[constants[orientation].dimension];
}
