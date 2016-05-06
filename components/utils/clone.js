import assign from 'object-assign';

export default function (dest, src) {
  const cloned = {};
  Object.keys(dest).forEach(val => {
    cloned[val] = assign({}, dest[val], src[val]);
  });
  return cloned;
}
