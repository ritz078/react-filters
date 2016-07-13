export default function (props) {
  const { min, max, value } = props;
  return ((value / (max - min))) * 100;
}
