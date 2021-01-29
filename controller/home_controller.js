const Post = require('../models/post');

module.exports.home = function(req, res){
    /*to read cookie from browser
    console.log(req.cookies);
    to sendthe cookie to the browser from server
    res.cookie('user_id',100);
    */

 
//populating user of each post
    Post.find({}).populate('user').exec(function(err, posts){
        res.render('home',{
            title: 'SocioGram | Home',
            posts: posts
        });
    }) 
 
}