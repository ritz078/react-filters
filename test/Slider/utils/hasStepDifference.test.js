const { describe, it, __base } = global;
const { hasStepDifference } = require(__base + 'components/Slider/utils/');
import { expect } from 'chai';

describe('hasStepDifference method', () => {
  it('should tell whether the lower and upper value difference is multiple of steps or > step',
    () => {
      const oldValue = 6;
      const newValue = 9;
      expect(hasStepDifference(newValue, oldValue, 2)).to.equal(true);
      expect(hasStepDifference(newValue, oldValue, 3)).to.equal(true);
      expect(hasStepDifference(2, 1, 2)).to.equal(false);
    });
});
