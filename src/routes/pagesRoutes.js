const express = require('express');
const router = express.Router();
const controllerPages = require('../controller/controllerPages');
const validacion=require('../middleware/validation');
const auth = require("../middleware/authMiddleware");

router.get('/', controllerPages.home);
router.get('/login',auth.visited, controllerPages.login);
router.post('/login', controllerPages.loginProcess);
router.get('/logout',auth.logged, controllerPages.logout);

router.get('/register',auth.visited, controllerPages.register);
router.post('/register', validacion,controllerPages.regProcess);

router.get('/contacto', controllerPages.contacto);
router.get('/somos', controllerPages.somos);

//Rutas de instalador
router.get('/install', controllerPages.install);
router.post('/install', controllerPages.installProcess);



module.exports = router;