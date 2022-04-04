const express = require('express');
const router = express.Router();
const controllerApiDiscount = require('../../controller/api/controllerDiscountApi');

router.get('/', controllerApiDiscount.index);
router.get('/count', controllerApiDiscount.count);

module.exports = router;