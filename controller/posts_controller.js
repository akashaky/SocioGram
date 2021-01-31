const Post = require("../models/post")
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports.create = function(req, res){
    Post.create({
        content : req.body.content,
        user: req.user._id
    }, function(err, post){
        if(err){
            req.flash('error', 'Error in publishing your post');
            return;
        }
        req.flash('success', 'Your Post is Publised !!');
        return res.redirect('back');
    });

}

module.exports.destroy = function(req, res){
    Post.findById(req.params.id, function(err, post){
        if(post.user == req.user.id){
            post.remove();
            Comment.deleteMany({post: req.params.id}, function(err){
                req.flash('success', 'Your Post and comment related to it is deleted');
                return res.redirect('back');
            });
       }else{
           req.flash('error', 'Error in deleting post');
           return res.redirect('back');
       }
    });
}