const { describe, it, before, after, __base } = global;
import { expect } from 'chai';
import sinon from 'sinon';

const debounce = require(`${__base}components/utils/debounce`).default;

describe('debounce()', () => {
  it('shouldnt execute immediately if immediate is not passed', () => {
    const callback = sinon.spy();

    const fn = debounce(callback, 100);

    expect(callback.calledOnce).to.equal(false);
    fn();
    expect(callback.calledOnce).to.equal(false);
  });

  let clock;

  before(() => (clock = sinon.useFakeTimers()));
  after(() => (clock.restore()));

  it('should execute the function after delay', () => {
    const callback = sinon.spy();

    const fn = debounce(callback, 100);

    fn();

    clock.tick(99);
    expect(callback.calledOnce).to.equal(false);

    clock.tick(1);
    expect(callback.calledOnce).to.equal(true);
  });

  it('should execute at start if immediate flag is passed', () => {
    const callback = sinon.spy();
    const fn = debounce(callback, 100, true);

    fn();

    expect(callback.calledOnce).to.equal(true);
  });

  it('should be called once in interval', () => {
    const callback = sinon.spy();
    const fn = debounce(callback, 100);

    fn();
    fn();
    fn();
    clock.tick(99);
    expect(callback.calledOnce).to.equal(false);

    clock.tick(1);
    fn();
    fn();
    fn();

    expect(callback.calledOnce).to.equal(true);
  });
});
