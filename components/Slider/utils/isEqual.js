/**
 * Tells if two arrays are exactly similar
 * @param val1
 * @param val2
 * @returns {boolean}
 */
export default function (val1, val2) {
  let isSame = true;
  if (typeof val1 === 'object' && typeof val2 === 'object') {
    if (val1.length !== val2.length) return false;
    val1.forEach((val, i) => {
      if (val2[i] !== val) isSame = false;
    });
  } else {
    isSame = (val1 === val2);
  }

  return isSame;
}
