const express = require('express');
const router = express.Router();
const controllerCategory = require("../controller/controllerSize")
const  authMiddleware = require("../middleware/authMiddleware")

// router.get('/',authMiddleware.admin,controllerCategory.list);
// router.get('/:id/list',controllerCategory.onlyCategory);
// router.get('/:id/edit',authMiddleware.admin,controllerCategory.edit);
// router.put('/:id/edit',authMiddleware.admin,controllerCategory.editProcess);
// router.get('/add',authMiddleware.admin,controllerCategory.add);
// router.post('/add',authMiddleware.admin,controllerCategory.addProcess);

module.exports = router;