const e = require('express')
const mongoose = require('mongoose')


const connectDB = async () =>{
  try {
    await mongoose.connect('mongodb+srv://aldoq:Rickenbacker959$@test-db.vbr60.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("not connected");
  }
}

module.exports= connectDB