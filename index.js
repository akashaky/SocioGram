const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

const db = require('./config/mongoose');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
    

//setting up the views in frontend
app.set('view engine', 'ejs');
app.set('views','./views');
app.use(express.static('assests'));
app.use(express.urlencoded());


app.use(session({
    name: 'rSocioGram',
    secret: 'YouCanPutAnything',
    saveUninitialized: false, // when the user is not logged in
    resave: false,
    cookie:{
        maxAge: (1000*120*100)
    },
    store: new MongoStore({
        mongooseConnection : db,
        autoRemove: 'disabled'
    }, function(err){
        console.log(err || 'connected to mongodb setup')
    })
}));

app.use(passport.initialize()); 
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(cookieParser());


app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log('Error in running the server');
        return;
    }
    console.log(`Server is running on port ${port}`);
});