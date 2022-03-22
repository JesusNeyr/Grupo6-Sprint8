const express = require('express');
const router = express.Router();
const controllerApiUser = require('../../controller/api/controllerUserApi')

router.get('/', controllerApiUser.index);
router.get('/:id/detail', controllerApiUser.detail);

module.exports = router;