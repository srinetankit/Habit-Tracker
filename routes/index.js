//import package
const express=require('express');
const passport=require('passport');
const router= express.Router();

const homeController  = require('../controller/home_Controller');


router.get('/', passport.checkAuthentication , homeController.home);
router.use('/users', require('./users'));


console.log('router loaded');

module.exports=router;