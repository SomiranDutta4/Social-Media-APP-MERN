const express=require('express');
let signInOutRouter=express.Router();
const signinpage=require('../controllers/signinpage');
const signuppage=require('../controllers/signuppage');


signInOutRouter.get('/signin',signinpage.signinfunction);
signInOutRouter.post('/signin',signinpage.findprofile);

signInOutRouter.get('/signup',signuppage.signupfunction);
signInOutRouter.post('/signup',signuppage.signuprequest);

module.exports=signInOutRouter;