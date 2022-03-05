const path = require("path");

const { body } = require('express-validator');
const validateEmail = [
    body('name','Debe ingresar su nombre').exists().isLength({min:2}),
    body('lastName',"Debe ingresar su Apellido").exists().isLength({min:2}),
    body('email','Debe ingresar un email valido').exists().isEmail(),
    body('message','El mensaje debe tener entre 10 y 500 caracteres').exists().isLength({min:10,max:500})]

module.exports = validateEmail;