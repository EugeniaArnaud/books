const path = require("path");

const { body } = require('express-validator');
const validateAddItem = [
    body('name','Debe ingresar su nombre').exists().isLength({min:2}),
    body('origin','Debe ingresar el oriden del producto').exists().isLength({min:2}),
    body('presentation','Debe la presentacion').exists().isLength({min:2}),
    body('description','Debe ingresar la descripcion del producto y tener entre 10 y 300 caracteres').exists().isLength({min:10,max:300}),
    body('price','Debe ingresar el precio').exists().isNumeric(),
  ]

module.exports = validateAddItem;