const mongoose=require('mongoose');

const contactSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Roll_No:{
        type:Number,
        required:true
    },
    Branch:{
        type:String,
        required:true
    },
});

const Contact=mongoose.model('SocioNode_Contacts',contactSchema);
module.exports=Contact;