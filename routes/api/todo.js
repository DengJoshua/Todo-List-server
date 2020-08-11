const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
   title:String,
   completed: { type: Boolean, Default: false }
})

module.exports = mongoose.model('Todo', todoSchema)