const model = require('../postgresModel.js');

const postAbout = (req, res) => {
  // if (req.body) {
  //   model.addProduct(req.body, results => res.send(results));
  // } else {
  //   res.end();
  // }
};
const putAbout = (req, res) => {
  // if (parseInt(req.params.id, 10)) {
  //   model.getAll(req.params.id, results => res.send(results));
  // } else {
  //   res.end();
  // }
};

module.exports = {
  postAbout,
  putAbout,
};
