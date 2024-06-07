const mongoose=require('mongoose');
const db=require('../config/PostMongoose');
const profileschema=require('../models/signup');

module.exports.signinfunction=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    return res.render('signinpage');
}

// module.exports.createSession=function(req,res){
//     // console.log(req.body.password);
//     profileschema.findOne({email:req.body.email,}).then(foundprofile=>{

//         if(foundprofile){

//         if(foundprofile.password==req.body.password){
//             res.cookie('user',foundprofile._id);
//             return res.redirect('/');
//     }else{
//         console.log('profile credentials did not match')
//         return res.redirect('back');
//         };
//     }else{
//         console.log("profile not available");
//         return res.redirect('back');
//         }
//     })
// }

module.exports.createSession=function(req,res,err){
    if(err){
        return res.redirect('/user/signin')
    }
    return res.redirect('/');
}