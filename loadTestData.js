// const faker = require('faker');

const getRandomNumberWeightedTowardMax = (max) => {
  if (Math.random() < 0.1) {
    return Math.ceil(Math.random() * 0.9 * max);
  }
  return 0.9 * max + Math.ceil(Math.random() * 0.1 * max);
};

const generateWeightedId = (context, events, done) => {
  context.vars.id = getRandomNumberWeightedTowardMax(10000000);
  return done();
};

module.exports = {
  generateWeightedId,
};
