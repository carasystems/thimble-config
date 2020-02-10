const config = require('config');
const util = require('./util');
const consts = require('./consts');
const merge = require('./merge');

const secureConfig = util
  .getEnv(consts.ENV_SECURE_CONFIG, 'false')
  .toLowerCase();

module.exports =
  secureConfig === 'true'
    ? util.makeImmutable(merge.secureConfigMerge(config))
    : util.makeImmutable(config);
