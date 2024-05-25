const mongoose=require('mongoose');
const db=require('../config/PostMongoose')
const dataindb=require('../models/signup');
const returnnewpf=require('./findprofile');
const profilerouter = require('../routes/signedprofile');


module.exports.signupfunction=function(req,res){
    return res.render('signuppage');
}

module.exports.signuprequest=function(req,res){
    const requestedemail=req.body.email;
    if(req.body.email==undefined || req.body.password==undefined || req.body.name==undefined){
        console.log('please enter complete details');
        return res.redirect('back');
    }
    // dataindb.findOne
    dataindb.findOne({"email":requestedemail}).then(foundduplicate=>{if(foundduplicate){
        console.log("already have a profile with:",req.body.email);
        return res.redirect('back');}else{
        dataindb.create({
            email:req.body.email,
            password:req.body.password,
            name:req.body.firstname+' '+req.body.lastname,
        }).then(newprofile=>{
            console.log('created new rofile')
            //dynamic addition of route for new profile
            const profileRoute='/'+searchfunction(newprofile.name);
            profilerouter.get(profileRoute,returnnewpf.foundprofile);

            return res.redirect('/profile/signin');
        })
        }})
}

const searchfunction=(name)=>{
    let splitt=name.split(' ');
    let returnedname='';
    for(let i=0;i<splitt.length;i++){
        if(i!=splitt.length-1){
        returnedname+=(splitt[i]+'%20');}else{
            returnedname+=splitt[i];
        }
    }
    return returnedname;
}
