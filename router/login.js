const express = require('express');

const router = express.Router();
const User = require('../models/User');
const validateLogin = require('../middleware/validateLogin')
const { validationResult } = require("express-validator");

router.get('/', (req,res)=>{
    res.render('login')
})
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
  });

router.post('/',validateLogin,async(req,res)=>{
    const resultValidation = validationResult(req);
    if(resultValidation.errors.length > 0){
        console.log(resultValidation.mapped());
        return res.render("login", {
            errors: resultValidation.array(),
            oldData: req.body,
        })}else{
 const {user,pass} = req.body;
    const data = await User(user,pass);
    if(data != undefined){
        //console.log(data);
        req.session.user = user;
        res.redirect("/");
    }else{
        const msg = "Usuario no encontrado";
        res.render('login',{msg});
    }
}
})



module.exports = router;