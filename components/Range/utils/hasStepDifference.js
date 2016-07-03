export default function (newValue, oldValue, step) {
  return Math.abs(newValue - oldValue) >= step;
}
