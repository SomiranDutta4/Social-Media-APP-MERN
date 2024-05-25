const mongoose=require('mongoose');

const profile=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
},{timestamps:true})

const createdprofile=mongoose.model('profile',profile);
module.exports=createdprofile;