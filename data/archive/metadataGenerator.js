const faker = require('faker');
const fs = require('fs');

const {
  productCount, batchCount, tab, randomInt, generateName,
} = require('./utils.js');

const thumbnailCount = 1000;
const thumbnailEndpoint = 'https://s3.amazonaws.com/sdc-yangtze-details';

const generatePrice = () => randomInt(10, 400) - 0.01;

const generateThumbnail = id => `${thumbnailEndpoint}/product_${id % thumbnailCount}.png`;

const generateReviews = (rawScore) => {
  const reviews = [null, null, null, null, null].map((item, index) => {
    const weight = Math.abs(index / 5 - rawScore);
    return randomInt(0, weight * 1000);
  });
  return `${reviews.join('\t')}`;
};

const generateProduct = (id) => {
  const productId = tab(`${id}`);
  const brandName = tab(faker.name.lastName());
  const isPrime = tab(faker.random.boolean());
  const productName = tab(generateName(id - 1, 7));
  const productPrice = tab(generatePrice());
  const productTier = tab(faker.company.catchPhraseAdjective());
  const numQuestions = tab(randomInt(3, 50));
  const reviewTotals = tab(generateReviews(Math.random()));
  const sellerName = tab(faker.name.firstName());
  const stockCount = tab(randomInt(10, 200));
  const thumbnailUrl = generateThumbnail(id);
  return `${productId
    + brandName
    + isPrime
    + numQuestions
    + productName
    + productPrice
    + productTier
    + reviewTotals
    + sellerName
    + stockCount
    + thumbnailUrl}\n`;
};

const writeBatch = (start = 1, end, batchId = 1) => {
  const startTime = new Date();

  const stream = fs.createWriteStream(`${__dirname}/sampleData/products_${batchId}.tsv`);
  for (let i = start; i < end; i++) {
    stream.write(`${generateProduct(i)}`);
  }
  stream.on('end', () => stream.end());

  console.log(new Date() - startTime);
};

const writeProducts = (productCount, batchSize) => {
  for (let i = 1; i < productCount; i += batchSize) {
    const start = i;
    const end = i + batchSize;
    const batchId = Math.floor(i / batchSize);
    writeBatch(start, end, batchId);
  }
};

writeProducts(productCount, productCount / batchCount);
