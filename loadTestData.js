const getRandomId = (context, events, done) => {
  context.id = 8000000 + Math.floor(Math.random() * 2000000);
  return done();
};

module.exports = { getRandomId };
