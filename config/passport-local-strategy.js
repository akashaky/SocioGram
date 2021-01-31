const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');


//Find the user and establish the session
passport.use(new LocalStrategy({
    //usernameFielid is keyword, use to detect the unique attribute to idrntify the user 
    usernameField: 'email',
    passReqToCallback: true
}, function(req, email, password, done){
    //find the user and establish the session
    //done is a function
    User.findOne({email: email}, function(err, user){
        if(err){
            req.flash('error', 'Error in finding error')
            return done(err);
        }
        if(!user || user.password != password){
            req.flash('error', 'Invalid Userrname/Password')
            //
            return done(null, false);
        }
        return done(null, user);
    });
}));


// serializing the user to decide which key is to be kept in cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});


// deserialiszing the user from browser to server
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding the user');
            return done(err);
        }
        return done(null, user);
    });
});

passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;