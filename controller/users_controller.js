const User = require('../models/user');
const fs = require('fs');
const path = require('path');

// rendering the sign-up page
module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile',{
            title:"Profile",    
            user_profile : user  
        });     

    });
  
}

//updating the profile


module.exports.update =  async function(req, res){
//     if(req.params.id == req.user.id){
//         User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
//             req.flash('success', 'Profile Updated');
//             return res.redirect('back');
            
//         });
//     }else{
//         req.flash('error', 'Unauthorized User');
//         return res.status(401).send('Unauthorized');
       
//     }
// }
        if(req.params.id == req.user.id){

            try{
                let user = await User.findById(req.params.id);
                User.uploadedAvatar(req, res, function(err){
                    if(err){
                        console.log('Error in multer');
                    }
                    // console.log(req.file);
                    user.name = req.body.name;
                    user.email = req.body.email;
                    if(req.file){
                        if(user.avatar){
                            if(fs.existsSync(path.join(__dirname, '..', user.avatar))){
                                fs.unlinkSync(path.join(__dirname, '..', user.avatar))
                            }
                            
                        }
                        //saving the path of the uploaded file into the avatar field of the user
                        user.avatar = User.avatarPath + '/' + req.file.filename
                    }
                    user.save();
                    return res.redirect('back');
                })


            }catch(err){
                req.flash('error', 'Error in uplading image');
                return res.redirect('back');
            }

        }else{
            req.flash('error', 'Unauthorized User');
            return res.status(401).send('Unauthorized');
        }

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
        req.flash('error', 'Password does not mateched');
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
                  req.flash('success', 'Your account has been created successfully');
                return res.redirect('/users/sign-in');
            });
        }else
        req.flash('error', 'User with this email id already exists');
        res.redirect('back');
    });
}


module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destorySession = function(req, res){
    req.logout();
    req.flash('success', 'Logged out Successfully');
    return res.redirect('/');
}
