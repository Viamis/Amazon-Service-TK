const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const router = require('./router.js');

const port = process.env.PORT || 3003;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

// app.get('/:id', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public/index.html'));
// });
app.use('/:id', express.static(path.join(__dirname, '../public')));

app.listen(port, () => console.log('Listening on port 3003'));
