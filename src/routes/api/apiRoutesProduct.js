const express = require('express');
const router = express.Router();
const controllerApiProduct = require('../../controller/api/controllerProductApi')
const multerMiddleware = require('../../middleware/uploadDashboard')

router.get('/', controllerApiProduct.index);
router.get('/:id/detail', controllerApiProduct.detail);
router.get('/count', controllerApiProduct.count);
router.get('/lastProduct', controllerApiProduct.lastProduct);
router.post('/create', controllerApiProduct.createProduct);
router.post('/edit/:id',multerMiddleware.single('image'), controllerApiProduct.updateProduct);

module.exports = router;