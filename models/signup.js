const mongoose=require('mongoose');

const profile=new mongoose.Schema({
    email:{
        type:String,
        // unique:true
    },
    password:{
        type:String,
    },
    name:{
        type:String,
    },
    uid:{
        type:Number
    },
    otp:{
        type:String
    },
    validTill:{
        type:Date
    }
},{timestamps:true})

const createdprofile=mongoose.model('profile',profile);
module.exports=createdprofile;