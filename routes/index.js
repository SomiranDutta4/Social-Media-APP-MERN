const express=require('express');
const router=express.Router();
console.log("Router loaded");
const homeController=require('../controllers/homeController');
const app=express();
// app.use(express.json());
app.use(express.urlencoded());

router.get('/',homeController.home);
router.use('/user',require('./users'));
router.use('/post',require('./Post'));

//for any further routes,this portion will be used

module.exports=router;

//the home page is here shown,then if there are additional things in
//get req,such as /users, it is sent further into users.js file which has all the users pages
//currently only /users/profile is seet