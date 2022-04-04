const express = require('express');
const router = express.Router();
const controllerApiContact = require('../../controller/api/controllerContactApi')

router.get('/', controllerApiContact.index);
router.get('/:id/view', controllerApiContact.detail);
router.post('/:id/view', controllerApiContact.updateView);
router.post('/:id/view/old', controllerApiContact.updateViewOld);

module.exports = router;