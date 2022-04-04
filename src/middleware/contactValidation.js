const {body}=require('express-validator');

const contactValidation=[
    body('name').notEmpty().withMessage('Nombre obligatorio').isLength({min:2}).withMessage('Debe tener minimo 2 caracteres'),
    body('email').notEmpty().withMessage('Email vacio').bail()
    .isEmail().withMessage('Ingrese mail valido').bail(),
    body('message').notEmpty().withMessage('Mensaje obligatorio').isLength({min:20}).withMessage('El mensaje debe tener minimo 20 caracteres')
]
module.exports=contactValidation;