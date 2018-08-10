const connection = require('../data/postgresConnection.js');

const handleResults = (err, results, callback, startTime) => {
  console.log('Query time:', new Date() - startTime);
  if (err) {
    console.error(err);
    return;
  }
  callback(results);
};

const execMultiple = (queryStrings, callback) => {
  const next = () => {
    const queryString = queryStrings.pop();
    if (queryString) {
      connection.query(queryString, (err, results) => {
        handleResults(err, results, next);
      });
    } else {
      callback();
    }
  };
  next();
};

const generateAddString = (tableName, data) => {
  let queryString = `INSERT INTO ${tableName} `;
  queryString += `(${Object.keys(data).join(',')}) `;
  queryString += 'VALUES (';
  for (key in data) {
    const value = parseFloat(data[key]) ? data[key] : `'${data[key]}'`;
    queryString += `${value},`;
  }
  queryString = `${queryString.substring(0, queryString.length - 1)})`;
  console.log(queryString);
  return queryString;
};

const generateUpdateString = (tableName, idName, idValue, data) => {
  let queryString = `UPDATE ${tableName} SET`;
  for (key in data) {
    const value = parseFloat(data[key]) ? data[key] : `'${data[key]}'`;
    queryString += ` ${key}=${value},`;
  }
  queryString = `${queryString.substring(0, queryString.length - 1)} WHERE ${idName}=${idValue}`;
  console.log(queryString);
  return queryString;
};

const addProduct = (data, callback) => {
  const startTime = new Date();
  const queryString = generateAddString('products', data);
  connection.query(queryString, (err, results) => {
    handleResults(err, results, callback, startTime);
  });
};

const getProductById = (productId, callback) => {
  const startTime = new Date();
  const queryString = `SELECT * FROM products WHERE id=${productId}`;
  connection.query(queryString, (err, results) => {
    handleResults(err, results, callback, startTime);
  });
};

const getProductByName = (productName, callback) => {
  const startTime = new Date();
  const queryString = `SELECT * FROM products WHERE product_name='${productName}'`;
  connection.query(queryString, (err, results) => {
    handleResults(err, results, callback, startTime);
  });
};

const updateProduct = (productId, data, callback) => {
  const startTime = new Date();
  const queryString = generateUpdateString('products', 'id', productId, data);
  connection.query(queryString, (err, results) => {
    handleResults(err, results, callback, startTime);
  });
};

const deleteProduct = (productId, callback) => {
  const queryStrings = [
    `DELETE FROM products WHERE id='${productId}'`,
    `DELETE FROM about_product WHERE product_id='${productId}'`,
    `DELETE FROM related_products WHERE product_id='${productId}'`,
  ];
  execMultiple(queryStrings, callback);
};

// const getRelated = function getRelatedProducts(productName, productId, callback) {
//   connection.query(
//     `select id, product_tier, price, stock_count, thumbnail from products where name='${productName}' and id <> ${productId}`,
//     (err, results) => {
//       if (err) console.error(err);
//       callback(results);
//     },
//   );
// };

// const getAll = function getProductAndRelatedProducts(productId, callback) {
//   const storage = {};
//   getProduct(productId, (results) => {
//     storage.data = parseData(results[0]);
//     const productName = results[0].name;
//     getRelated(productName, productId, (relatedResults) => {
//       storage.related = relatedResults.map(object => parseData(object));
//       callback(storage);
//     });
//   });
// };

module.exports = {
  getProductById,
  getProductByName,
  // getAll,
  addProduct,
  updateProduct,
  deleteProduct,
};

// const color = ['green', 'white', 'blue', 'black', 'silver', 'purple'];

// const size = ['S', 'M', 'L', 'XL'];
