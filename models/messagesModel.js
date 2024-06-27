const mongoose=require('mongoose')

const messages=new mongoose.Schema({
    body:{
        type:String
    },
    time:{
        type:String
    },
    sender:{
        type:String
    }
})

const users=new mongoose.Schema({
    uid:{
        type:String
    },
    name:{
        type:String
    }
})

const messageSchema=new mongoose.Schema({
    users:[users],
    roomName:{
        type:String
    },
    messages:[messages],

    LatestMessage:{
        Latestmessage:{
            type:String
        },
        sentAt:{
            type:String
        },
        sender:{
            type:String
        }
    },
    seen:{
        type:Boolean
    }

})

const MessageModel=mongoose.model('message',messageSchema)
module.exports=MessageModel

