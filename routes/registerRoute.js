const bcrypt = require('bcrypt');
const registerModel = require('../models/registerModel');
const registerRouter = require('express').Router();


registerRouter.post("/register",async (req,res)=>{
    try{
       const email = req.body.email;
       const password = req.body.password;
       const hashed = await bcrypt.hash(password,10);
       const data  = new registerModel({
           email:email,
           password:hashed
       })
       console.log(email,password);
       await data.save();
       res.status(200).send({response:'registered sucessfully'})
   }
    
   catch(e){
       res.status(400).send({data:e});
       console.log('error',e);
   }
   
   });
   
module.exports = registerRouter;