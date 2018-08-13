require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const cluster = require('cluster');
const router = require('./router.js');

const masterProcess = () => {
  const numCPUs = require('os').cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
};

const childProcess = () => {
  const port = process.env.PORT || 3003;
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(router);

  app.use('/:id', express.static(path.join(__dirname, '../public')));

  app.listen(port, () => console.log('Listening on port 3003'));
};

if (cluster.isMaster) {
  masterProcess();
} else {
  childProcess();
}
