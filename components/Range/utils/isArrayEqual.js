/**
 * Tells if two arrays are exactly similar
 * @param arr1
 * @param arr2
 * @returns {boolean}
 */
export default function (arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  let isSame = true;
  arr1.forEach((val, i) => {
    if (arr2[i] !== val) isSame = false;
  });
  return isSame;
}
