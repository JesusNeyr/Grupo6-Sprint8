const express = require('express');
const router = express.Router();
const controllerApiProduct = require('../../controller/api/controllerProductApi')

router.get('/', controllerApiProduct.index);
router.get('/:id/detail', controllerApiProduct.detail);
router.get('/count', controllerApiProduct.count);
router.get('/lastProduct', controllerApiProduct.lastProduct);
router.post('/create', controllerApiProduct.createProduct);

module.exports = router;