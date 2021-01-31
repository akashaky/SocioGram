const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.create = function(req, res){
    Post.findById(req.body.post, function(err, post){
        if(err){
            req.flash('error', 'Error in creating comment');
        }
        if(post){
            Comment.create({
                content: req.body.content,
                post : req.body.post,
                user: req.user._id
            }, function(err, comment){
                post.comments.push(comment);
                post.save();
                req.flash('success', 'Comment Created');
                res.redirect('/');
              
            });
        }
    });
}

module.exports.destroy = function(req, res){
    Comment.findById(req.params.id, function(err, comment){
        let postId = comment.post;
        Post.findById(postId, function(err, post){             

        if(comment.user == req.user.id || post.user == req.user.id){
            
            comment.remove();
            Post.findByIdAndUpdate(postId, {$pull : {comments: req.params.id}}, function(err, post){
                req.flash('success', 'Comment deleted');
                return res.redirect('back');
            });
           
        }else{
            return res.redirect('back');
        }
    });
});

    
}