/**
 * Returns the new value Array or string based on which control is changed and
 * type of slider
 * @param currentVal : current value of the slider (Array | Number)
 * @param newValue : value of one control (Number)
 * @param changed : 'lower' or 'upper'
 * @param type : 'range' or 'value'
 * @returns {*}
 */
export default function (currentVal, newValue, changed, type) {
  let val = newValue;
  if (type === 'range') {
    val = (changed === 'lower') ? [newValue, currentVal[1]] : [currentVal[0], newValue];
  }
  return val;
}
