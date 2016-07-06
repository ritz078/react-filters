/**
 * Returns the closest integer value to the value calculated by cursor position
 * @param value non-formatted value calculated by cursor position
 * @param step step difference allowed in the slider
 * @param min minimum value on the slider
 * @returns {*} the nearest rounded valid number
 *  eg: if value = 24.6 and step = 2 the closest valid number is 24 and not 25 since
 *      the next valid number is 26 which is farther than 24.
 */
export default function (value, step, min) {
  const remainder = value % step;
  const prevNumber = (value - remainder) + min;
  const nextNumber = prevNumber + step;
  return (value - prevNumber) >= (nextNumber - value) ? nextNumber : prevNumber;
}
