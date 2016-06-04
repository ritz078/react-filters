export default function (value, max, min, sliderLength, slider) {
  const offset = slider.clientWidth / 2;
  const ratio = sliderLength / (max - min);
  return value * ratio - offset;
}
