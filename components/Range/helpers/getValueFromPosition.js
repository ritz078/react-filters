import { formatNumber } from '../utils';

export default function (props, position) {
  const { min, max, trackOffset, step } = props;
  const ratio = (max - min) / trackOffset.width;
  return formatNumber(position * ratio, step, min);
}
