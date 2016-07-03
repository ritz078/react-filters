const { describe, it, __base } = global;
const { formatNumber } = require(`${__base}components/Range/utils/`);
import { expect } from 'chai';

describe('formatNumber', () => {
  it('should return rounded number', () => {
    expect(formatNumber(24.6)).to.equal(25);
  });

  it('should return formatted number to exact decimal points if n is passed', () => {
    expect(formatNumber(25.8796, 2)).to.equal(25.88);
  });
});
