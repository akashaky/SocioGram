const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function(req, res){
    /*to read cookie from browser
    console.log(req.cookies);
    to sendthe cookie to the browser from server
    res.cookie('user_id',100);
    */

 
//populating user of each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate:{
            path: 'user',
        }
    })
    .exec(function(err, posts){
        User.find({}, function(err, users){
            res.render('home',{
                title: 'SocioGram | Home',
                posts: posts,
                all_users: users
            });

        });
      
    }) ;
 
}