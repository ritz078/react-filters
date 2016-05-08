const { describe, it } = global;
import { expect } from 'chai';
import styleProcessor from '../../components/utils/styleProcessor';

describe('styleProcessor() method', () => {
  it('should return base style if no option is passed', () => {
    const style = {
      base: {
        a: {
          color: 'green'
        }
      },
      disabled: {
        a: {
          color: 'grey'
        }
      }
    };

    expect(styleProcessor(style)).to.equal(style.base);
  });

  it('should return merged style with the base based on option', () => {
    const style = {
      base: {
        a: {
          color: 'green',
          margin: 10,
          height: 6
        }
      },
      active: {
        a: {
          color: 'grey',
          width: 10
        }
      }
    };

    const option = { active: true };

    const actual = styleProcessor(style, option);
    const expected = {
      a: {
        color: 'grey',
        width: 10,
        margin: 10,
        height: 6
      }
    };

    expect(actual).to.deep.equal(expected);
  });

  it('should give highest preference to disabled in case multiple states are true', () => {
    const style = {
      base: {
        a: {
          color: 'green',
          margin: 10,
          height: 6
        }
      },
      active: {
        a: {
          color: 'grey',
          width: 10
        }
      },
      disabled: {
        a: {
          color: 'yellow',
          padding: 5
        }
      }
    };

    const option = {
      active: true,
      disabled: true
    };

    const actual = styleProcessor(style, option);
    const expected = {
      a: {
        color: 'yellow',
        width: 10,
        margin: 10,
        height: 6,
        padding: 5
      }
    };

    expect(actual).to.deep.equal(expected);
  });
});
