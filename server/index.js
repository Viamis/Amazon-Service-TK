const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const router = require('./router.js');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.use('/*', express.static(path.join(path.dirname(__dirname), 'public')));

app.get('*/bundle.js', (req, res) => {
  res.sendFile(path.join(path.dirname(__dirname), 'public/bundle.js'));
});

app.listen(3003, () => console.log('Listening on port 3003'));
