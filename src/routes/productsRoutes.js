const express = require('express');
const router = express.Router();

const controllerProduct=require('../controller/controllerProduct');
const controllerAuth = require("../middleware/authMiddleware")
const upload = require('../middleware/multerMiddleware');

//lista los productos
router.get('/', controllerProduct.productos);

//vista del formulario crear
router.get('/create',controllerAuth.admin, controllerProduct.create);
//accion del formulario crear
router.post('/', upload.single('img'), controllerProduct.crearAccion);
//editar form
router.get('/:id/edit',controllerAuth.admin ,controllerProduct.edit);
//accion editar formulario
router.put('/:id/edit',controllerAuth.admin, upload.single('img'), controllerProduct.update);
//detalle del producto
router.get('/detail/:id', controllerProduct.productDetail);
//accion eliminar
router.delete('/:id/delete',controllerAuth.admin, controllerProduct.productDelete);
//recomendar
router.post('/:id/recommended', controllerAuth.logged, controllerProduct.recommended);
//quitar recomendación
router.delete('/:id/recommendedDelete', controllerAuth.logged, controllerProduct.recommendedDelete);

//search
router.get('/search',controllerProduct.search)
module.exports=router;