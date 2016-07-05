const { describe, it, __base } = global;
const { removeClass } = require(`${__base}components/Slider/utils/`);
import { expect } from 'chai';

describe('removeClass utility method', () => {
  it('should remove return the class string after removing the specified string', () => {
    const element = {
      className: 'foo bar hello'
    };

    expect(removeClass(element, 'bar')).to.equal('foo hello');
  });
});
