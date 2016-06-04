export default function (props, value) {
  const { min, max, step } = props;
  return (value[1] - value[0] >= step) && value[0] >= min && value[1] <= max;
}
