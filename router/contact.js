const express = require("express");
const { validationResult } = require('express-validator');
const router = express.Router();
const nodemailer = require("nodemailer");
const validateEmail = require('../middleware/validateEmail')

/*GET*/
router.get("/", (req, res) => {
  res.render("contacto");
});

/*POST*/
router.post("/",validateEmail,async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const oldData = req.body;
    const msgError = errors.array();
    console.log('msgError ---->' + msgError);
    res.render('contacto',{msgError,oldData})
  }

  const emailMsg = {
    to: "maritesarthe@gmail.com",
    from: req.body.email,
    subject: "Mensaje desde formulario de contacto",
    html: `${req.body.name} ${req.body.lastName} envió el siguiente mensaje: ${req.body.message}`,
  };

 
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "5269e56b456d28",
      pass: "c734cdf8729096"
    }
  });

  const sendMailer = await transport.sendMail(emailMsg);
  console.log('respuesta del sendmailer  ' + sendMailer.response);
  const codigo=sendMailer.response.split(' ', 1);
  console.log('respuesta corta ----> '+ codigo);
  
  if(codigo =='250'){
  res.render("contacto", {
    message: "mensaje enviado",
  });

}else{
  res.render("contacto", {
    message: "error en el envio",
  });
}
});
module.exports = router;