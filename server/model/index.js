const cassandra = require('../../data/cassandraConnection.js');
const redis = require('../../data/redisConnection.js');
const {
  handleResults,
  generateAddProductString,
  generateUpdateProductString,
  translateDataForClient,
} = require('./utils.js');

const getProductById = (productId, callback) => {
  const startTime = new Date();
  redis.get(productId, (err, reply) => {
    if (reply) {
      handleResults(null, reply, callback, startTime);
    } else {
      const queryString = 'SELECT * FROM products WHERE id = ?';
      cassandra.execute(queryString, [productId], { prepare: true }, (err, results) => {
        const data = results && translateDataForClient(results.rows[0]);
        handleResults(err, data, callback, startTime);
        redis.setex(productId, 300, JSON.stringify(data), redis.print);
      });
    }
  });
};

const getProductByName = (productName, callback) => {
  const startTime = new Date();
  redis.get(productName, (err, reply) => {
    if (reply) {
      handleResults(null, reply, callback, startTime);
    } else {
      const queryString = 'SELECT * FROM products_by_name WHERE product_name = ?';
      cassandra.execute(queryString, [productName], { prepare: true }, (err, results) => {
        const data = results && translateDataForClient(results.rows[0]);
        handleResults(err, data, callback, startTime);
        redis.setex(productName, 300, JSON.stringify(data), redis.print);
      });
    }
  });
};

const updateProductCount = (count) => {
  cassandra.execute(
    'UPDATE product_count SET count = ? WHERE id = ?',
    [count, 1],
    { prepare: true },
    (err) => {
      if (err) console.error(err);
    },
  );
};

const addProduct = (data, callback) => {
  const startTime = new Date();
  cassandra.execute(
    'SELECT count from product_count WHERE id = ?',
    [1],
    { prepare: true },
    (err, results) => {
      if (err) callback(err);
      else {
        const id = results.rows[0].count + 1;
        const queryString = generateAddProductString(data, id);
        updateProductCount(id, callback);
        cassandra.execute(queryString, Object.values(data), { prepare: true }, (err, results) => {
          handleResults(err, results, callback, startTime);
        });
      }
    },
  );
};

const updateProduct = (productId, data, callback) => {
  redis.del('productId');
  const queryString = generateUpdateProductString(productId, data);
  const startTime = new Date();
  cassandra.execute(queryString, Object.values(data), { prepare: true }, (err, results) => {
    handleResults(err, results, callback, startTime);
  });
};

const deleteProduct = (productId, callback) => {
  redis.del(productId);
  const queryString = 'DELETE FROM products WHERE id = ?';
  const startTime = new Date();
  cassandra.execute(queryString, [productId], { prepare: true }, (err, results) => {
    handleResults(err, results, callback, startTime);
  });
};

module.exports = {
  getProductById,
  getProductByName,
  addProduct,
  updateProduct,
  deleteProduct,
};
