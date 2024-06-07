const express=require('express');
let signInOutRouter=express.Router();
const signinpage=require('../controllers/signinpage');
const signuppage=require('../controllers/signuppage');
const passport=require('passport');
const profileaccount=require('../controllers/profileaccount');

signInOutRouter.get('/signin',signinpage.signinfunction);
// signInOutRouter.post('/create-session',signinpage.createSession);


//use passport as middleware to authenticate
signInOutRouter.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/user/signin'},
),signinpage.createSession)

signInOutRouter.get('/signup',signuppage.signupfunction);
signInOutRouter.post('/create',signuppage.signuprequest);

signInOutRouter.get('/signout',profileaccount.signout);


module.exports=signInOutRouter;