import { formatNumber } from '../utils';

export default function (props, position) {
  const { min, max, precision, trackOffset } = props;
  const ratio = (max - min) / trackOffset.width;
  return formatNumber(position * ratio, precision);
}
