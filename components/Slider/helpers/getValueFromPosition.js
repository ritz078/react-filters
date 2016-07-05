import { formatNumber } from '../utils';
import constants from '../constants';

export default function (props, position) {
  const { min, max, trackOffset, step, orientation } = props;
  const ratio = (max - min) / trackOffset[constants[orientation].dimension];
  if (orientation === 'vertical') position = trackOffset.height - position;
  return formatNumber(position * ratio, step, min);
}
