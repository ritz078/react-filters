export default function (props, sliderWidth) {
  const { min, max, trackLength, value } = props;
  const offset = sliderWidth && trackLength ? sliderWidth / (2 * trackLength) : 0;
  return ((value / (max - min)) - offset) * 100;
}
