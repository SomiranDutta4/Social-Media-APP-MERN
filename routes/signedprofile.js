const express=require('express');
const profilerouter=express.Router();
const db=require('../config/PostMongoose');
const profiles=require('../models/signup');
// var foundpf;
const profileaccount=require('../controllers/profileaccount');
const passport = require('passport');

// const searchfunction=(name)=>{
//     let splitt=name.split(' ');
//     let returnedname='';
//     for(let i=0;i<splitt.length;i++){
//         if(i!=splitt.length-1){
//         returnedname+=(splitt[i]+'%20');}else{
//             returnedname+=splitt[i];
//         }
//     }
//     return returnedname;
// }


// profiles.find({}).then(found=>{
profilerouter.get('/account',profileaccount.findprofile);
profilerouter.get('/edit',profileaccount.editprofile);
profilerouter.post('/edit/name',profileaccount.editname);
profilerouter.post('/edit/email',profileaccount.editemail);
profilerouter.post('/edit/password',profileaccount.editpassword);

// module.exports=searchfunction;
module.exports=profilerouter;
