const mongoose=require('mongoose');
const db=require('../config/PostMongoose');
const profileschema=require('../models/signup');

module.exports.signinfunction=function(req,res){
    return res.render('signinpage');
}

module.exports.findprofile=function(req,res){
    // console.log(req.body.password);
    profileschema.findOne({email:req.body.email,}).then(foundprofile=>{

        if(foundprofile){

        if(foundprofile.password==req.body.password){
            res.cookie('user',foundprofile._id);
            return res.redirect(`/user/${foundprofile.name}`);
            // return res.render('profiles',{'user':{
            //     name:foundprofile.name,
            //     email:foundprofile.email
            // }})
    }else{
        console.log('profile credentials did not match')
        return res.redirect('back');
        };
    }else{
        console.log("profile not available");
        return res.redirect('back');
        }
    })
}
