/* eslint-env node, mocha */

const chai = require('chai');
const sinon = require('sinon');
const s3 = require('../lib/s3');
const merge = require('../lib/merge');

const { expect } = chai;

describe('merge tests', () => {
  it('secure merge', (done) => {
    const org = {
      app: 'demo',
      k1: 'k1',
      k2: 'abc',
    };

    const secureConf = {
      k1: 'k11',
      k3: 'k3',
    };

    sinon
      .stub(s3, 'getObject')
      .returns({ Body: Buffer.from(JSON.stringify(secureConf), 'UTF-8') });

    const finallyConf = merge.secureConfigMerge(org);

    expect(finallyConf.k2).to.equal('abc');
    expect(finallyConf.k1).to.equal('k11');
    expect(finallyConf.k3).to.equal('k3');
    done();
  });
});
