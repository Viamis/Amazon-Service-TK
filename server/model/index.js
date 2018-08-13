// const client = require('../../data/postgresConnection.js');
const client = require('../../data/cassandraConnection.js');
const {
  handleResults,
  generateAddProductString,
  generateUpdateProductString,
  translateDataForClient,
} = require('./utils.js');

const getProductById = (productId, callback) => {
  const queryString = 'SELECT * FROM products WHERE id = ?';
  const startTime = new Date();
  client.execute(queryString, [productId], { prepare: true }, (err, results) => {
    const data = results && translateDataForClient(results.rows[0]);
    handleResults(err, data, callback, startTime);
  });
};

const updateProductCount = (count) => {
  client.execute(
    'UPDATE product_count SET count = ? WHERE id = ?',
    [count, 1],
    { prepare: true },
    (err) => {
      if (err) console.error(err);
    },
  );
};

const getProductByName = (productName, callback) => {
  const queryString = 'SELECT * FROM products_by_name WHERE product_name = ?';
  const startTime = new Date();
  client.execute(queryString, [productName], { prepare: true }, (err, results) => {
    const data = results && translateDataForClient(results.rows[0]);
    handleResults(err, data, callback, startTime);
  });
};

const addProduct = (data, callback) => {
  const startTime = new Date();
  client.execute(
    'SELECT count from product_count WHERE id = ?',
    [1],
    { prepare: true },
    (err, results) => {
      if (err) callback(err);
      else {
        const id = results.rows[0].count + 1;
        const queryString = generateAddProductString(data, id);
        updateProductCount(id, callback);
        client.execute(queryString, Object.values(data), { prepare: true }, (err, results) => {
          handleResults(err, data, callback, startTime);
        });
      }
    },
  );
};

const updateProduct = (productId, data, callback) => {
  const queryString = generateUpdateProductString(productId, data);
  const startTime = new Date();
  client.execute(queryString, Object.values(data), { prepare: true }, (err, results) => {
    handleResults(err, data, callback, startTime);
  });
};

const deleteProduct = (productId, callback) => {
  const queryString = 'DELETE FROM products WHERE id = ?';
  const startTime = new Date();
  client.execute(queryString, [productId], { prepare: true }, (err, results) => {
    handleResults(err, data, callback, startTime);
  });
};

module.exports = {
  getProductById,
  getProductByName,
  addProduct,
  updateProduct,
  deleteProduct,
};
