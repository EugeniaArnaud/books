const path = require("path");

const { body } = require('express-validator');

const validateLogin = [
	body('user','Debe ingresar un Usuario').notEmpty(),
	body('pass','Debe ingresar una contraseña').notEmpty(),
]


module.exports= validateLogin;