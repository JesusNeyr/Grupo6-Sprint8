const express = require('express');
const router = express.Router();
const controllerApiCategories = require('../../controller/api/controllerCategoriesApi')

router.get('/', controllerApiCategories.index);
router.get('/products', controllerApiCategories.ProductCategory);
router.get('/count', controllerApiCategories.count);

module.exports = router;