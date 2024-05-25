const mongoose=require('mongoose');
const db=require('../config/PostMongoose');
const profilesdb=require('../models/signup');

module.exports.foundprofile=function(req,res){

    if(req.cookies!=undefined){
        let requestedprofile='';
    
        for(let i=0;i<req.path.length;i++){
            if(i==0){
                continue;
            }
            if(req.path[i]!='%'){
                requestedprofile+=req.path[i];
                
            }else if(req.path[i]=='%' && req.path[i+2]==0){
                requestedprofile+=' ';
                i+=2;
            }
        }
        console.log('USER:',requestedprofile);
    profilesdb.findOne({'_id':req.cookies.user}).then(founditt=>{
        if(founditt){
            
            if(founditt.name==requestedprofile){
            return res.render('profiles',{'user':{
                name:founditt.name,
                email:founditt.email
            }})}else{
                return res.redirect('/profile/signin');
            }
        }else{
            return res.redirect('/profile/signin');
        }
    })}else{
        return res.redirect('/profile/signin');
    }
}