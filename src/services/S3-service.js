const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: 'ap-south-1'
});

const s3 = new AWS.S3();

function uploadToS3(filepath, filename, callback) {
  const fileContent = fs.readFileSync(filepath);

  const params = {
    Bucket: 'myexpensebucket1234',
    Key: `reports/${filename}`,
    Body: fileContent,
    ContentType: 'application/pdf'
  };

  s3.upload(params, (err, data) => {
    if (err) return callback(err);
    callback(null, data.Location); // S3 file URL
  });
}

module.exports = {
    uploadToS3
}