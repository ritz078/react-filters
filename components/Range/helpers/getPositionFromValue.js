export default function (props, sliderWidth) {
  const { min, max, trackOffset, value } = props;
  const offset = sliderWidth && trackOffset.width ? sliderWidth / (2 * trackOffset.width) : 0;
  return ((value / (max - min)) - offset) * 100;
}
