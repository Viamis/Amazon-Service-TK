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

module.exports = {
  productCount,
  batchCount,
  tab,
  randomInt,
  generateName,
};
