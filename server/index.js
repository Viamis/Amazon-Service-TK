const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const database = require('./database.js');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('*/bundle.js', (req, res) => {
  res.sendFile(path.join(path.dirname(__dirname), 'public/bundle.js'));
});

app.get('/products/:id', (req, res) => {
  if (parseInt(req.params.id, 10)) {
    database.getAll(req.params.id, results => res.send(results));
  } else {
    res.end();
  }
});

app.post('/products', (req, res) => {
  if (req.body) {
    database.addProduct(req.body, results => res.send(results));
  } else {
    res.end();
  }
});

app.put('/products/:id', (req, res) => {
  if (parseInt(req.params.id, 10)) {
    database.updateProduct(req.params.id, req.body.name, results => res.send(results));
  } else {
    res.end();
  }
});

app.delete('/products/:id', (req, res) => {
  if (parseInt(req.params.id, 10)) {
    database.deleteProduct(req.params.id, results => res.send(results));
  } else {
    res.end();
  }
});

app.use('/*', express.static(path.join(path.dirname(__dirname), 'public')));

app.listen(3003, () => console.log('Listening on port 3003'));
