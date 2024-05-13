const express=require('express');
const router=express.Router();
const usercontroller=require('../controllers/profileController');


router.get('/profile1',usercontroller.user1);
router.get('/profile2',usercontroller.user2);
module.exports=router;