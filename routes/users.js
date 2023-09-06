
const express= require('express');
const passport=require('passport');

const router=express.Router();

//IMPORTING USER_CONTROLLER MODULE

const userController= require('../controller/users_controller');


router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);

router.post('/create', userController.create);

//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect : '/users/sign-in'}
), 
userController.createSession);

router.get('/sign-out', userController.destroySession);

router.use('/habit', require('./habit'));

module.exports= router;
