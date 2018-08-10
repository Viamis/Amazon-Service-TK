const { Pool } = require('pg');

const pool = new Pool({
  database: 'product_db',
  port: 5432,
});

module.exports = pool;
