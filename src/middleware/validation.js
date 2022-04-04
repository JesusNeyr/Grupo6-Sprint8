const {body}=require('express-validator');

const validaciones=[
    body('first_name').notEmpty().isLength({min:2}).withMessage('Nombre obligatorio'),
    body('last_name').notEmpty().withMessage('Apellido obligatorio'),
    body('email').notEmpty().withMessage('Email vacio').bail()
    .isEmail().withMessage('Ingrese mail valido').bail(),
    body('pass').notEmpty().withMessage('Contraseña campo obligatorio').isLength({min:5}).withMessage('La contraseña debe tener minimo 5 caracteres').custom((value,{req})=>{
        if(value!=req.body.pass1){
            throw new Error('Las contraseñas no coinciden')
        }
        return true
    })

]
module.exports=validaciones;