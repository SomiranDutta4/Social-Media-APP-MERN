const express=require('express');
const profilerouter=express.Router();
const db=require('../config/PostMongoose');
const profiles=require('../models/signup');
const returnfunction=require('../controllers/findprofile');

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

profiles.find({}).then(found=>{
    for(let i=0;i<found.length;i++){
        profilerouter.get(`/${searchfunction(found[i].name)}`,returnfunction.foundprofile);
    }
})

module.exports=profilerouter;
