const User = require('../models/user');

// rendering the sign-up page
module.exports.profile = function(req, res){
    return res.render('user_profile',{
        title:"Profile",      
    });
}
// rendering signup page
module.exports.signUp = function(req, res){
   
    return res.render('user_sign_up',{
        title: 'SoicoGram | Sign-up'
    });
}

// rendering the sign-in page

module.exports.signIn = function(req, res){
    return res.render('user_sign_in',{
        title: 'SoicoGram  | Sign-in'
    });
}

// creating the user 
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('Error in handling the mail');
        }
        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('Error while creating the user');
                   return;
                }
                return res.redirect('/users/sign-in');
            });
        }else
        
        res.redirect('back');
    });
}


module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destorySession = function(req, res){
    req.logout();
    return res.redirect('/');
}
