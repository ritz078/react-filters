export default function (num, step, min) {
  const remainder = num % step;
  const prevNumber = (num - remainder) + min;
  const nextNumber = prevNumber + step;
  return (num - prevNumber) >= (nextNumber - num) ? nextNumber : prevNumber;
}
