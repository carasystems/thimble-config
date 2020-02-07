const AWS = require('aws-sdk');
const deasync = require('deasync');

const s3 = new AWS.S3();

module.exports.getObject = (bucket, key) => {
  let done = false;
  let error = null;
  let result = null;
  s3.getObject(
    {
      Bucket: bucket,
      Key: key,
    },
    (err, data) => {
      done = true;
      if (err) {
        error = err;
      }
      if (data) {
        result = data;
      }
    }
  );
  deasync.loopWhile(() => !done);
  if (error) {
    throw error;
  }

  return result;
};
