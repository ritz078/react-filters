const { describe, it, __base } = global;
const { isWithinRange } = require(`${__base}components/Slider/utils/`);
import { expect } from 'chai';

describe('isWithinRange utility method', () => {
  const props = {
    trackLength : 400,
    min: 5,
    max: 15,
    step: 3
  };

  it('should tell if the value is within range for a number', () => {
    expect(isWithinRange(props, 8)).to.equal(true);
    expect(isWithinRange(props, 16)).to.equal(false);
    expect(isWithinRange(props, 4)).to.equal(false);
  });

  it('should tell if the values are withing range and following steps for Array', () => {
    expect(isWithinRange(props, [8, 11])).to.equal(true);
    expect(isWithinRange(props, [4, 14])).to.equal(false);
  });
});
