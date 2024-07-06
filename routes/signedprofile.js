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
profilerouter.post('/edit/name/user',profileaccount.editname);
profilerouter.post('/edit/email/user',profileaccount.editemail);
profilerouter.post('/edit/password/user',profileaccount.editpassword);
profilerouter.post('/post',profileaccount.postpage)
profilerouter.get('/post',profileaccount.postpage)
profilerouter.post('/createpost',profileaccount.createPost)
profilerouter.post('/search',profileaccount.profilesearch);
profilerouter.post('/post/comment/',profileaccount.createcomment)
profilerouter.post('/edit/bio/user',profileaccount.editbio)
profilerouter.post('/change/password/verify',profileaccount.verifiedPassEdit)
profilerouter.post('/edit/content/',profileaccount.editpostcontent)
profilerouter.post('/delete/post/',profileaccount.deletepost)
profilerouter.delete('/like/post/',profileaccount.like)

// module.exports=searchfunction;
module.exports=profilerouter;
