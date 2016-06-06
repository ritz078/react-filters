export default function (props, slider) {
  const { min, max, trackLength, value } = props;
  const offset = slider.clientWidth / 2;
  const ratio = trackLength / (max - min);
  return Math.round(value * ratio - offset);
}
