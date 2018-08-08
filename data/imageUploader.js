const fetch = require('node-fetch');
const AWS = require('aws-sdk');
const faker = require('faker');

const s3 = new AWS.S3();
const bucket = 'sdc-yangtze-details';

const imageCount = 1000;

const uploadImage = (source, destination) => {
  fetch(source)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      return Promise.reject(new Error(`Failed to fetch ${response.url}: ${response.status} ${response.statusText}`));
    })
    .then(response => response.buffer())
    .then(buffer => (
      s3.putObject({
        Bucket: bucket,
        Key: destination,
        Body: buffer,
        ACL: 'public-read',
      }).promise()
    ))
};

const uploadImages = (imageCount) => {
  for (let i = 0; i < imageCount; i++) {
    const image = faker.image.avatar();
    uploadImage(image, `product_${i}.png`);
  }
}

uploadImages(imageCount);
