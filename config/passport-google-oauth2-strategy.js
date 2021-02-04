const passport =require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto =require('crypto');

const User = require('../models/user');

//Using googleStrategy
passport.use(new googleStrategy({
        clientID:  "344864976312-h282uiqaevrn508st6gd042lrqav46j2.apps.googleusercontent.com",
        clientSecret: "HEPzb1QUjH_AVXfUSsBXkbcp",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
   },

   function(accessToken, refreshToken, profile, done){

    //find a user
       User.findOne({email: profile.emails[0].value}).exec(function(err, user){
           if(err){
               console.log("Error in google srartegy");
               return;
           }
           console.log(profile);
           if(user){
               //if found set this user as req.user
               return done(null, user);
           }else{
               //if user not found, create an account
               User.create({
                   name: profile.displayName,
                   email: profile.emails[0].value,
                   password: crypto.randomBytes(25).toLocaleString('hex')
               }, function(err, user){
                   if(err){
                       console.log("Error in cretaing user");
                       return;
                   }
                   return done(null, user);
               });
           }
       });
   }

))


module.exports = passport