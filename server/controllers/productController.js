const model = require('../postgresModel.js');

postProduct = (req, res) => {
  const { body } = req;
  if (Object.keys(body).length) {
    model.addProduct(body, results => res.send(results));
  } else {
    res.end();
  }
};

getProductById = (req, res) => {
  const {
    params: { id },
  } = req;
  if (parseInt(id, 10)) {
    model.getProductById(id, results => res.send(results));
  } else {
    res.end();
  }
};

getProductByName = (req, res) => {
  const {
    params: { name },
  } = req;
  if (name) {
    model.getProductByName(name, results => res.send(results));
  } else {
    res.end();
  }
};

patchProduct = (req, res) => {
  const {
    params: { id },
  } = req;
  const { body } = req;
  if (Object.keys(body).length) {
    model.updateProduct(id, body, results => res.send(results));
  } else {
    res.end();
  }
};

deleteProduct = (req, res) => {
  const {
    params: { id },
  } = req;
  if (parseInt(id, 10)) {
    model.deleteProduct(id, results => res.send(results));
  } else {
    res.end();
  }
};

module.exports = {
  postProduct,
  getProductById,
  getProductByName,
  patchProduct,
  deleteProduct,
};
