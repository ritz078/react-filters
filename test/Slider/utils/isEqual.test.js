const { describe, it, __base } = global;
const { isEqual } = require(`${__base}components/Slider/utils/`);
import { expect } from 'chai';

describe('isArrayEqual Method', () => {
  it('should return true if two arrays are exactly same', () => {
    const array1 = [2, 'hello'];
    const array2 = [2, 'hello'];
    expect(isEqual(array1, array2)).to.equal(true);

    const array3 = ['2', 'hello'];
    expect(isEqual(array1, array3)).to.equal(false);

    const array4 = [2, 'hello', 2];
    expect(isEqual(array1, array4)).to.equal(false);
  });
});
