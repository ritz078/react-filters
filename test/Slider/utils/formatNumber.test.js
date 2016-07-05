const { describe, it, __base } = global;
const { formatNumber } = require(`${__base}components/Range/utils/`);
import { expect } from 'chai';

describe('formatNumber', () => {
  it('should return nearest valid integer if min = 0', () => {
    expect(formatNumber(24.6, 1, 0)).to.equal(25);
    expect(formatNumber(24.6, 2, 0)).to.equal(24);
    expect(formatNumber(24.8, 3, 0)).to.equal(24);
  });

  it('should return nearest valid integer if min != 0', () => {
    expect(formatNumber(25.8796, 2, 1)).to.equal(25);
    expect(formatNumber(25.4, 3, 2)).to.equal(26);
  });
});
