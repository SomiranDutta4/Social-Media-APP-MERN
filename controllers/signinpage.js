const mongoose=require('mongoose');
const db=require('../config/PostMongoose');
const profileschema=require('../models/signup');
const bcrypt=require('bcryptjs');
const nodemailer=require('nodemailer')
// const sendgridTransport=require('nodemailer-sendgrid-transport');

   const transporter= nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    secure:true,
    port:465,
    auth:{
        user:'somirandutt@gmail.com',  
        pass:'yfcb ujwb hcpn cerp'
    }
})

module.exports.signinfunction=async (req,res)=>{
    if(req.isAuthenticated()){
    return res.redirect('/')
    }
    let errorMessage=req.flash('error');

    if(errorMessage.length>0){
        console.log(errorMessage[0])
        if(errorMessage[0]=='Missing credentials'){
            errorMessage='Invalid Password or email'
            console.log(errorMessage)
        }
    }else{
        errorMessage=null
    }
    return res.render('signinpage',{
        'errorMessage':errorMessage
    });
}

// module.exports.createSession=function(req,res){
//     let password=req.body.password;
//     // console.log(req.body.password);
//     profileschema.findOne({email:req.body.email,}).then(foundprofile=>{

//         if(foundprofile){
//             console.log(foundprofile,password)
//             bcrypt.compare(password,foundprofile.password).then(matched=>{
//                 if(matched){
//                     return res.redirect('/');}else{
//                         return res.redirect('/user/signin')
//                 //     if(foundprofile.password==req.body.password){
//                 //         res.cookie('user',foundprofile._id);
//                 //         return res.redirect('/');
//                 // }else{
//                 //     console.log('profile credentials did not match')
//                 //     return res.redirect('back');
//                 //     };
//                 }
//             })
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