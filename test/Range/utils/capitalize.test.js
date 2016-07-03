const { describe, it, __base } = global;
const { capitalize } = require(`${__base}components/Range/utils/`);
import { expect } from 'chai';

describe('capitalize util method()', () => {
  it('should return capitalized string', () => {
    const str = 'foo bar';
    expect(capitalize(str)).to.equal('Foo bar');
  });
});
