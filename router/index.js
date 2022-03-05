const express = require('express');
const router = express.Router();
const {validationResult } = require('express-validator');
const product = require('../models/Products')
const cloudinary  = require('cloudinary').v2;
const util = require('util');

const secured = require('../middleware/secured')
const validateAddItem = require('../middleware/validateAddItem')

const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

router.get('/',async(req,res)=>{
    const data = await product.getProduct();

    const products = data.map((product)=>{
      const imageUrl = cloudinary.url(product.image)
      return {
        ...product, imageUrl
      }
    })

    res.render('index',{products});
})

router.get('/addItem',secured,(req,res)=>{
  res.render('addItem');

})

router.post('/addItem',validateAddItem,async(req,res)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const oldData = req.body;
    const msgError = errors.array();
    console.log('msgError ---->' + msgError);
    res.render('addItem',{msgError,oldData})
  }else{
  try{
    
      let imageFile = req.files.imageFile;
      const img_id =  (await uploader(imageFile.tempFilePath)).public_id;
      
      const { name, origin, presentation, description, price} = req.body;
      const newProduct ={
        name,
        origin,
        presentation,
        description,
        price,
        image: img_id
      };
      await product.addProduct(newProduct);
      res.redirect("/");
    }catch(error){
      console.log('error del /addItems router-----> '+ error);
    }
  }
})


router.get('/editItem/:id',secured,async(req,res)=>{
 try{
    const oneProduct = await product.oneProduct(req.params.id);
    const row = {
      id: oneProduct[0].id,
      name: oneProduct[0].name,
      origin: oneProduct[0].origin,
      presentation: oneProduct[0].presentation,
      description: oneProduct[0].description,
      price: oneProduct[0].price,
      image: oneProduct[0].image

    }
    res.render('editItem',{row});
    //console.log(row);
  }catch(err){
    console.log('error en index router ---->' + err);
  }
  
})

router.post('/editItem/:id', secured,async(req,res)=>{
 let img_id = null;
 if(!req.files){
   img_id = req.body.imageActual
 }else{
  
  const row = await product.getProduct(req.params.id);
  await destroy(row[0].image);  await destroy(row[0].image);


  let imageFile = req.files.imageFile;
  img_id =  (await uploader(imageFile.tempFilePath)).public_id;
 }
 const data = {
  id: req.params.id,
  name: req.body.name,
  origin: req.body.origin,
  presentation: req.body.presentation,
  description: req.body.description,
  price: req.body.price,
  image:img_id

}
await product.modifyProduct(data,data.id);

  res.redirect('/');

})

router.get('/deleteProduct/:id',secured, async(req,res)=>{
  const row = await product.getProduct(req.params.id);
  await destroy(row[0].image);
  await product.deleteProduct(req.params.id);
  res.redirect('/');


})

module.exports = router;