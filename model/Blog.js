const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    content:{
        type: String,
        required: true
    }
},{timestamps:true})

const blogSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    tags: [{
        type: String,
    }],
    category: {
        type: String,
        enum: ['Technology', 'Travel', 'Food', 'Fashion', 'Sports'],
        required: true,
    },
    comments: [commentSchema]
},{timestamps: true});

const Comment = mongoose.model('Comment',commentSchema)
const Blog = mongoose.model('Blog',blogSchema)

module.exports = {
    Comment, Blog
}