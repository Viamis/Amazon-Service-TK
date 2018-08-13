const router = require('express').Router();
const controller = require('./controller');

router.get('/products/:id', controller.getProductById);
router.get('/products/name/:name', controller.getProductByName);
router.post('/products', controller.postProduct);
router.patch('/products/:id', controller.patchProduct);
router.delete('/products/:id', controller.deleteProduct);

module.exports = router;
