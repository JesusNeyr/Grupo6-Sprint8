const express = require('express');
const router = express.Router();
const controllerPerfil = require('../controller/controllerPerfil');
const auth = require("../middleware/authMiddleware");
const upload = require('../middleware/avatarUpload');

router.get('/:id',auth.logged,controllerPerfil.detail);
router.get('/:id/edit',auth.logged,auth.user,controllerPerfil.edit);
router.put('/:id/edit/address',auth.logged,auth.user,controllerPerfil.addressProcess);
router.put('/:id/edit/info',auth.logged,auth.user,upload.single('avatar'),controllerPerfil.userInfoProcess);
// /perfil/3/editar


module.exports=router;
