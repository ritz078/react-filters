/**
 * Returns an array of ids which are selected
 * if arr = [{key: 1, value:true}, {key:2, value:false}, {key: 3, value: true}] and key = 'key'
 * it will return [1, 3]
 * @param arr
 * @param key
 */
export default function (arr, key) {
  const selected = [];
  arr.forEach(val => {
    if (val.value) selected.push(val[key]);
  });
  return selected;
};
