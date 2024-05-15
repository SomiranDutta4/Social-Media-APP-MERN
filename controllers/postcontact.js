const db=require('../config/PostContactMongoose');
const Contact = require('../models/Contact');
const express=require('express');
let bodyparser=require('body-parser');

// const ContactList=Contact.find({});
// module.exports.contactLists=function(req,res){
//     return res.render('postContact',{'contacts':ContactList});
// }

module.exports.contactlists=function(req,res){
    Contact.find({}).then(ContactList=>{
        console.log("fetched data");
        return res.render('postContact',{'contacts':ContactList});
    }).catch(err=>{
        console.log(err);
    })
}
module.exports.postContact=function(req,res){
    console.log(req.body);
        Contact.create({
            Name:req.body.Name,
            Roll_No:2345678,
            Branch:req.body.Branch
        }).then(createdContact=>{
            console.log("successfully created new contact:",createdContact);
            return res.redirect('back');
        }).catch(error=>{
            console.log("failed to create contact");
        })
}