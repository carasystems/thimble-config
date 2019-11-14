/* eslint-env node, mocha */

const chai = require('chai');
const config = require('../lib');

const { expect } = chai;

describe('immutable config tests', () => {
  it('should be immutable for default', (done) => {
    config.k2 = 2222222;
    expect(config.k2).to.equal(3);
    done();
  });
});
