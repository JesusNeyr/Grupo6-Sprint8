const express = require('express');
const router = express.Router();
const controllerCart = require('../controller/controllerCart');
const validacion=require('../middleware/validation');
const auth = require("../middleware/authMiddleware");

router.get('/',auth.logged, controllerCart.carrito);
router.post('/add/:id',auth.logged,controllerCart.carritoAdd)
router.delete('/delete/:id',auth.logged,controllerCart.carritoDelete)
router.post('/codePromo',auth.logged,controllerCart.carritoCode)
router.delete('/deleteCode/:id',auth.logged,controllerCart.carritoDeleteCode)


module.exports = router;