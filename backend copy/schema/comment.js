const mongoose = require('mongoose')
const commentSchema = mongoose.Schema({
  title : {type : String, required: true },
  description : {type : String, required: true },
})

const  Comment = mongoose.model('comment',commentSchema)
module.exports = Comment;