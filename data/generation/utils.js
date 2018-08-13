const productCount = 10000000;
const batchCount = 10;

const tab = str => `${str}\t`;

const randomInt = (min, max) => min + Math.floor(Math.random() * (max - min));

const ltrs = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

const generateName = (index, length) => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += ltrs[index % 10];
    index = Math.floor(index / 10);
  }
  return result;
};

const generatePrice = () => randomInt(10, 400) - 0.01;

const thumbnailCount = 1000;
const thumbnailEndpoint = 's3.amazonaws.com/sdc-yangtze-details';

const generateThumbnail = id => `${thumbnailEndpoint}/product_${id % thumbnailCount}.png`;

module.exports = {
  productCount,
  batchCount,
  tab,
  randomInt,
  generateName,
  generatePrice,
  generateThumbnail,
};
