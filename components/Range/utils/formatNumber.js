export default function (num, n) {
  return !n ? Math.round(num) : parseFloat(num.toFixed(n));
}
