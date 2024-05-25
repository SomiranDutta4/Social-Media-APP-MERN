const express=require('express');
const postroute=express.Router();
const postcontact=require('../controllers/postcontact');
// const app=express();
// // app.use(express.json());
// app.use(express.urlencoded());

postroute.get('/contact',postcontact.contactlists);
postroute.post('/contact',postcontact.postContact);
// function(req,res){
//     Contact.create({
//         Name:req.body.Name,
//         Roll_No:req.body.Roll_No,
//         Branch:req.body.Branch
//     }).then(createdContact=>{
//         console.log("successfully created new contact");
//     }).catch(error=>{
//         console.log("failed to create contact");
//     })
//     return res.redirect('back');
// }
// );

module.exports=postroute;