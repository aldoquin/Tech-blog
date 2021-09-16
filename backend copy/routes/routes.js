const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware');
const User = require('../schema/userSchema');


router.post('/register',async (req,res)=>{
 const {name ,password, email} =req.body
 const existingUser = await User.findOne({
   email
 })
 existingUser && res.json({msg: 'email used already has an account'}).status(400)
 if(!existingUser){
   const hash = await bcrypt.genSalt(saltRounds)
   const hashedPassword = await bcrypt.hash(password,hash)
  try {
    const user = new User({
      name: name,
      email: email,
      password:hashedPassword
    })
    user.save()
    res.send('added user') 
  } catch (err) {
    console.log(err);
  }
 }
}) 
router.post('/user/Login', async(req,res)=>{
  const {password, email} =req.body
  const user = await User.findOne({email})
  !user && res.json({ msg: 'Unauthorized' }).status(400);
  const match = await bcrypt.compare(password,user.password)
  !match && res.json({ msg: 'Unauthorized' }).status(400);

  const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
  res.header("x-auth-token",token).json({token:token})
  res.send(token)
  res.send(error).status(400)
})

router.post('/comment', authMiddleware , async(req,res)=>{
  const {title,description } =req.body
  try {
    const comment = new Comment({
      title: title,
      description: description,
    })
    comment.save()
    res.send('comment added') 
  } catch (err) {
    console.log(err);
  }
})


module.exports = router;