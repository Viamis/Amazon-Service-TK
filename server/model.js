const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'product_db',
});

const parseData = function parseStringifiedObjectsFromDataQuery(object) {
  const keys = ['about_product', 'price', 'reviews', 'product_options'];
  keys.forEach((key) => {
    if (object[key]) {
      object[key] = JSON.parse(object[key]);
    }
  });
  return object;
};

const getProduct = function getProductInformation(productId, callback) {
  connection.query(`select * from products where id=${productId}`, (err, results) => {
    if (err) console.error(err);
    callback(results);
  });
};

const getRelated = function getRelatedProducts(productName, productId, callback) {
  connection.query(
    `select id, product_tier, price, stock_count, thumbnail from products where name='${productName}' and id <> ${productId}`,
    (err, results) => {
      if (err) console.error(err);
      callback(results);
    },
  );
};

const getAll = function getProductAndRelatedProducts(productId, callback) {
  const storage = {};
  getProduct(productId, (results) => {
    storage.data = parseData(results[0]);
    const productName = results[0].name;
    getRelated(productName, productId, (relatedResults) => {
      storage.related = relatedResults.map(object => parseData(object));
      callback(storage);
    });
  });
};

// NEW crud functions

const addProduct = (
  {
    brand,
    name,
    product_tier,
    product_options,
    price,
    about_product,
    is_prime,
    stock_count,
    reviews,
    questions,
    seller,
    thumbnail,
  },
  callback,
) => {
  connection.query(
    `insert into products
    (brand, name, product_tier, product_options, price, about_product,
      is_prime, stock_count, reviews, questions, seller, thumbnail)
      values ("${brand}", "${name}", "${product_tier}", "${product_options}", "${price}",
      "${about_product}", ${is_prime}, ${stock_count}, "${reviews}", ${questions}, "${seller}", "${thumbnail}")`,
    (err, results) => {
      if (err) console.error(err);
      callback(results);
    },
  );
};

const updateProduct = (productId, name, callback) => {
  connection.query(`update products set name="${name}" where id=${productId}`, (err, results) => {
    if (err) console.error(err);
    callback(results);
  });
};

const deleteProduct = (productId, callback) => {
  connection.query(`delete from products where id=${productId}`, (err, results) => {
    if (err) console.error(err);
    callback(results);
  });
};

module.exports = {
  getProduct,
  getRelated,
  getAll,
  addProduct,
  updateProduct,
  deleteProduct,
};
