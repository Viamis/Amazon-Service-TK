const model = require('../postgresModel.js');

const postRelated = (req, res) => {
  // if (req.body) {
  //   model.addProduct(req.body, results => res.send(results));
  // } else {
  //   res.end();
  // }
};

const deleteRelated = (req, res) => {
  // if (parseInt(req.params.id, 10)) {
  //   model.getAll(req.params.id, results => res.send(results));
  // } else {
  //   res.end();
  // }
};

module.exports = {
  postRelated,
  deleteRelated,
};
