const fs = require('fs');
const path = require('path');
const { productCount, batchCount } = require('./utils.js');

let content = `DROP KEYSPACE IF EXISTS product_db;

CREATE KEYSPACE product_db
  WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 3 };

USE product_db;

DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS about_product;
DROP TABLE IF EXISTS related_products;

CREATE TABLE products (
  id INT PRIMARY KEY,
  brand VARCHAR,
  descriptions LIST<TEXT>,
  is_prime BOOLEAN,
  num_questions INT,
  product_name VARCHAR,
  product_price DECIMAL,
  product_tier VARCHAR,
  review_totals LIST<INT>,
  seller_name VARCHAR,
  stock_count INT,
  thumbnail_url VARCHAR,
  variants FROZEN<LIST <MAP<TEXT,TEXT>>>,
);

CREATE TABLE product_count (
  id INT PRIMARY KEY,
  count INT
);
`;

content += `CREATE MATERIALIZED VIEW products_by_name AS
SELECT * FROM products
WHERE product_name IS NOT NULL
PRIMARY KEY (product_name, id);`;

content += `INSERT INTO product_count (id, count) VALUES (1, ${productCount});`;

for (let i = 0; i < batchCount; i++) {
  content += `
    COPY products FROM './data/generation/sampleData/denormalized_${i}.tsv' WITH DELIMITER='\\t';
    `;
}

fs.writeFile(path.join(__dirname, '../cassandra-schema.cql'), content, 'utf8', (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('cassandra-schema.cql written');
});
