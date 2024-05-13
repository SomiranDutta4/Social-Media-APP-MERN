const express=require('express');
const postroute=express.Router();
const postcontact=require('../controllers/profileController');
const Postapp=express();
Postapp.set('view engine','ejs');
Postapp.set('views','../views');

postroute.get('/contact',postcontact.contactlists);

module.exports=postroute;