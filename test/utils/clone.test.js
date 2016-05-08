const { describe, it } = global;
import { expect } from 'chai';
import clone from '../../components/utils/clone';

describe('clone method', () => {
  it('should return correct value', () => {
    const dest = {
      foo: {
        foo1: 'a',
        foo3: 5
      },
      bar: {
        bar1: 'd',
        bar2: 'e'
      }
    };

    const src = {
      foo: {
        foo1: 6
      },
      bar: {
        bar3: 'f'
      }
    };

    const actual = clone(dest, src);
    const expected = {
      foo: {
        foo1: 6,
        foo3: 5
      },
      bar: {
        bar1: 'd',
        bar2: 'e',
        bar3: 'f'
      }
    };
    expect(actual).to.deep.equal(expected);
  });
});
