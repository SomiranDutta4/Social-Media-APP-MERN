const express=require('express');
const router=express.Router();
console.log("Router loaded");
const homeController=require('../controllers/homeController');

router.get('/',homeController.home);
router.use('/user',require('./users'));
// router.set('/post',require('./Post'));
//for any further routes,this portion will be used

module.exports=router;

//the home page is here shown,then if there are additional things in
//get req,such as /users, it is sent further into users.js file which has all the users pages
//currently only /users/profile is seet