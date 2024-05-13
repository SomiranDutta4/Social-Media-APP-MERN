const express=require('express');
const postallowance=express();
postallowance.set('view engine','ejs');
// const path=require('path');
postallowance.set('views','../views');
// postallowance.use(express.urlencoded());

module.exports.contactlists=function(req,res){
    return res.render('postContact');
}