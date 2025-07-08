const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
   title: {type: String , required:[true, 'Title is required'], trim: true},
   content: {type: String, required: [true, 'Content is required']},
   author: {type: String, required: [true, 'Author is required']},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

//middleware to set 'updateAt' before saving

postSchema.pre('save', (next) => {
   this.updatedAt = Date.now()
   next()
})


const Post = mongoose.model('Post', postSchema)
module.exports = Post