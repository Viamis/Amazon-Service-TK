const cassandra = require('cassandra-driver');

const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'product_db' });
client.connect((err) => {
  if (err) console.error(err);
});

module.exports = client;
