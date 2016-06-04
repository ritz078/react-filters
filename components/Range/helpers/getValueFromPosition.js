import { formatNumber } from '../utils';

export default function (props, position) {
  const { min, max, precision, trackLength } = props;
  const ratio = (max - min) / trackLength;
  return formatNumber(position * ratio, precision);
}
