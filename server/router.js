const router = require('express').Router();
const controller = require('./controller.js');

router.post('/products', controller.post);
router.get('/products/:id', controller.get);
router.put('/products/:id', controller.put);
router.delete('/products/:id', controller.delete);

module.exports = router;
