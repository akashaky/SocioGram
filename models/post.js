const mongoose = require('mongoose');
const User = require('../models/user');

const postSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    user: {
        //type is reference  which refer user schema
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //include the arrays of ids of all comments
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;