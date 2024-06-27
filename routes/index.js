const express=require('express');
const router=express.Router();
console.log("Router loaded");
const homeController=require('../controllers/homeController');
const passport=require('../config/passport-local')
const PostModel = require('../models/Post') // Assuming the model file is in a separate file


router.get('/',passport.checkAuthincation,homeController.home);
router.use('/post',passport.checkAuthincation,require('./Post'));
router.use('/user',require('./sign_in_up'));
// router.use('/profile',require('./singup'));
router.use('/profile',passport.checkAuthincation,require('./signedprofile'));
router.use('/message',require('./messageRoute'))

//for any further routes,this portion will be used

module.exports=router;

//the home page is here shown,then if there are additional things in
//get req,such as /users, it is sent further into users.js file which has all the users pages
//currently only /users/profile is seet