const AWS = require('aws-sdk');
const fs = require('fs').promises; 

const { AWS_SECRET_KEY, AWS_ACCESS_KEY } = require('../config/server-config.js');

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  region: 'ap-south-1'
});

const s3 = new AWS.S3();

async function uploadToS3(filepath, filename) {
  try {
    const fileContent = await fs.readFile(filepath);

    const params = {
      Bucket: 'myexpensebucket1234',
      Key: `reports/${filename}`,
      Body: fileContent,
      ContentType: 'application/pdf'
    };

    const data = await s3.upload(params).promise(); 
    return data.Location; 
  } catch (err) {
    throw err; 
  }
}

module.exports = {
  uploadToS3
};