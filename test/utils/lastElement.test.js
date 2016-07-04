const { describe, it, __base } = global;
import { expect } from 'chai';

const lastElement = require(`${__base}components/utils/lastElement`).default;

describe('lastElement', () => {
  it('should return the last element of an Array', () => {
    expect(lastElement([1, 2, 3])).to.equal(3);
  });

  it('should return null if empty array is passed', () => {
    expect(lastElement([])).to.equal(null);
  });
});
