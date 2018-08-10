const fs = require('fs');
const path = require('path');
const { batchCount } = require('./utils.js');

let content = `DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS about_product;
DROP TABLE IF EXISTS product_reviews;
DROP TABLE IF EXISTS related_products;

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  product_name VARCHAR(200) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  price DECIMAL NOT NULL,
  product_tier VARCHAR(50) NOT NULL,
  is_prime BOOLEAN NOT NULL,
  stock_count INTEGER NOT NULL,
  questions INTEGER NOT NULL,
  seller VARCHAR(50) NOT NULL,
  thumbnail TEXT NOT NULL,
  one_star_reviews INTEGER DEFAULT 0,
  two_star_reviews INTEGER DEFAULT 0,
  three_star_reviews INTEGER DEFAULT 0,
  four_star_reviews INTEGER DEFAULT 0,
  five_star_reviews INTEGER DEFAULT 0
);

CREATE TABLE about_product (
  product_id INTEGER NOT NULL,
  info VARCHAR(150) NOT NULL
);

CREATE TABLE related_products (
  product_id INTEGER NOT NULL,
  related_id INTEGER NOT NULL
);
`;

for (let i = 0; i < batchCount; i++) {
  content += `
    COPY about_product FROM '/Users/benc/Desktop/ben-details/data/generation/sampleData/about_${i}.tsv' DELIMITER E'\\t';
    COPY products FROM '/Users/benc/Desktop/ben-details/data/generation/sampleData/products_${i}.tsv' DELIMITER E'\\t';
    COPY related_products FROM '/Users/benc/Desktop/ben-details/data/generation/sampleData/related_${i}.tsv' DELIMITER E'\\t';
    `;
}

fs.writeFile(path.join(__dirname, '../postgres-schema.sql'), content, 'utf8', (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('postgres-schema.sql written');
});
