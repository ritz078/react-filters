const { describe, it, __base } = global;
const { isArrayEqual } = require(`${__base}components/Range/utils/`);
import { expect } from 'chai';

describe('isArrayEqual Method', () => {
  it('should return true if two arrays are exactly same', () => {
    const array1 = [2, 'hello'];
    const array2 = [2, 'hello'];
    expect(isArrayEqual(array1, array2)).to.equal(true);

    const array3 = ['2', 'hello'];
    expect(isArrayEqual(array1, array3)).to.equal(false);

    const array4 = [2, 'hello', 2];
    expect(isArrayEqual(array1, array4)).to.equal(false);
  });
});
