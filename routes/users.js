const express = require('express');
const router = express.Router();
const passport = require('passport');


const userController = require('../controller/users_controller');

router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);
router.get('/profile/:id', passport.checkAuthentication, userController.profile);
router.post('/update/:id', passport.checkAuthentication, userController.update);
router.post('/create', userController.create);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
),userController.createSession);

router.get('/sign-out', userController.destorySession);

module.exports =router;