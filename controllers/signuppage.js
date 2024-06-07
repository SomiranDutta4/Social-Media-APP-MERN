const mongoose=require('mongoose');
const db=require('../config/PostMongoose')
const dataindb=require('../models/signup');
const returnnewpf=require('./profileaccount');
const profilerouter = require('../routes/signedprofile');
// const passport =require('../config/passport-local')

module.exports.signupfunction=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/profile/account')
    }
    return res.render('signuppage');
}

module.exports.signuprequest=function(req,res,err){
    if(err){
        console.log('error setting up profile')
        return res.redirect('/user/signup')
    }

    console.log(req.body);
    const requestedemail=req.body.email;

    // if(req.body.email==undefined || req.body.password==undefined || req.body.lastname==undefined || req.body.firstname==undefined){
    //     console.log('please enter complete details');
    //     return res.redirect('back');
    // }else{
    // dataindb.findOne
    dataindb.findOne({"email":requestedemail}).then(foundduplicate=>{if(foundduplicate){

        console.log("already have a profile with:",req.body.email);
        return res.redirect('back');}else{

        dataindb.create({
            email:req.body.email,
            password:req.body.password,
            name:req.body.firstname+' '+req.body.lastname,
        }).then(newprofile=>{
            console.log('successfully created new rofile with email: ',req.body.email)
            return res.redirect('/user/signin');
        })
        }}).catch(err=>{
            console.log('error finding profile')
            return res.redirect('/')
        })
}

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
