const mongoose=require('mongoose')

const Comment=new mongoose.Schema({
    body:{
        type:String
    },
    author:{
        type:String
    },
})

const Likes=new mongoose.Schema({
    author:{
        type:String
    },
    uid:{
        type:Number
    }
})

const Post=new mongoose.Schema({
    content:{
        type:String,
    },
    author:{
        type:String
    },
    authoruid:{
        type:Number
    },
    likes:{
        type:Number,
        default:0
    },
    comments:{
        type:Number,
        default:0
    },
    likers:[Likes],
    Commenters:[Comment],
},{timestamps:true})

const posts=mongoose.model('posts',Post);
module.exports=posts; 