const express = require('express');
const router = express.Router();
const controllerApiSizes = require('../../controller/api/controllerSizesApi')

router.get('/', controllerApiSizes.index);
router.get('/count', controllerApiSizes.count);

module.exports = router;