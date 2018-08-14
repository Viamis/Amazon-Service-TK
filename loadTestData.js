const faker = require('faker');

const getRandomNumberWeightedTowardMax = (max) => {
  if (Math.random() < 0.1) {
    return Math.ceil(Math.random() * 0.9 * max);
  }
  return 0.9 * max + Math.ceil(Math.random() * 0.1 * max);
};

const ltrs = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
const generateName = (index, length) => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += ltrs[index % 10];
    index = Math.floor(index / 10);
  }
  return result;
};

const generateWeightedId = (context, events, done) => getRandomNumberWeightedTowardMax(10000000);

const generateWeightedName = (context, events, done) => {
  const id = getRandomNumberWeightedTowardMax(10000000);
  return generateName(id, 7);
};

const generateProductInfo = (context, events, done) => {
  const id = getRandomNumberWeightedTowardMax(10000000);
  const brand = 'brand';
  const is_prime = 1;
  const num_questions = 50;
  const product_name = generateName(context.vars.id, 4);
  const product_price = 0.99;
  const product_tier = 'first';
  const review_totals = [5, 5, 5, 5, 5];
  const seller_name = faker.name.firstName();
  const stock_count = 1;
  const thumbnail_url = 'url';
  return {
    id,
    body: {
      brand,
      is_prime,
      num_questions,
      product_name,
      product_price,
      product_tier,
      review_totals,
      seller_name,
      stock_count,
      thumbnail_url,
    },
  };
};

module.exports = {
  generateWeightedId,
  generateWeightedName,
  generateProductInfo,
};
