const mongoose=require('mongoose');

const profileSchema=new mongoose.Schema({
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
    isOnline:{
        type:Boolean
    },
    bio:{
        type:String
    },
    otp:{
        type:String
    },
    validTill:{
        type:Date
    }
},{timestamps:true})

const profile=mongoose.model('profile',profileSchema);
module.exports=profile;