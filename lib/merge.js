const s3 = require('./s3');
const util = require('./util');
const consts = require('./consts');

function secureConfigMerge(source) {
  const appName = source.app;
  const env = util.getEnv('NODE_ENV', 'development');
  const s3Key = `${appName}/${env}.json`;
  const s3Data = s3.getObject(consts.SECURE_BUCKET, s3Key);

  if (s3Data) {
    const secureConfig = JSON.parse(s3Data.Body.toString());
    return {
      ...source,
      ...secureConfig,
    };
  }
  return source;
}

module.exports.secureConfigMerge = secureConfigMerge;
