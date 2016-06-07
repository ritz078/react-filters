export default function (props, sliderWidth) {
  const { min, max, trackLength, value } = props;
  const offset = sliderWidth / 2;
  const ratio = trackLength / (max - min);
  return Math.round(value * ratio - offset);
}
