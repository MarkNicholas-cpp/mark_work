const loginRouter = require('express').Router();
const jwt     = require('jsonwebtoken');
const registerModel = require('../models/registerModel')

loginRouter.post('/',async(req,res)=>{
    const {email,password} = req.body;
    const users = await registerModel.find({email});
    const length    = users.length
    if (length) {
    const user = users[0];
    const userGmail =  user.email;
    const hash = user.password;
    const result = bcrypt.compare(password,hash);
   
    if(result){
       const token = jwt.sign({ userId: userGmail }, 'your-secret-key', {
           expiresIn: '1h',
           });
           res.status(200).json({ token });       
    }
    else{
       res.status(203).send({res:'password not correct'});
    }}
    else{
       res.status(400).send({'res':"gmail not found"});
    }
    
   });

   module.exports = loginRouter;