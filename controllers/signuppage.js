const mongoose=require('mongoose');
const db=require('../config/PostMongoose')
const dataindb=require('../models/signup');
const returnnewpf=require('./findprofile');


module.exports.signupfunction=function(req,res){
    return res.render('signuppage');
}

module.exports.signuprequest=function(req,res){
    const requestedemail=req.body.email;
    // dataindb.findOne
    dataindb.findOne({"email":requestedemail}).then(foundduplicate=>{if(foundduplicate){
        console.log("already have a profile with:",req.body.email);
        return res.redirect('back');}else{
        dataindb.create({
            email:req.body.email,
            password:req.body.password,
            name:req.body.firstname+' '+req.body.lastname,
        })
        console.log('created new rofile')
        
        return res.redirect('/profile/signin');
        }})
}