const message=require('../models/messagesModel')
const userdb=require('../models/signup')

module.exports.sendMessage=function(req,res){
    message.findOne({
        'users.uid':{$all:[req.user.uid,req.query.to]}
    })
    .then(foundmsg=>{
        let created=false;
        let latestMsg=req.body.msgBody
        let time=Date().split(' ')[4]+' '+Date().split(' ')[1]+' '+Date().split(' ')[2]+' '+Date().split(' ')[3]
        let usersarray=[]
        if(foundmsg){
            foundmsg.messages.push({
                body:req.body.msgBody,
                sender:req.user.name,
                time:Date().split(' ')[4]+' '+Date().split(' ')[1]+' '+Date().split(' ')[2]+' '+Date().split(' ')[3]
            })
            foundmsg.LatestMessage={
                Latestmessage:req.body.msgBody,
                sender:req.user.name,
                sentAt:Date().split(' ')[4]+' '+Date().split(' ')[1]+' '+Date().split(' ')[2]+' '+Date().split(' ')[3]
            }
            foundmsg.seen=false
            foundmsg.save()
        }else{
            created=true
            message.create({
                users:[
                    {
                        uid:req.user.uid,
                        name:req.user.name
                    },{
                        uid:req.query.to,
                        name:req.query.name
                    }
                ],
                messages:[
                    {
                        body:req.body.msgBody,
                        time:Date().split(' ')[4]+' '+Date().split(' ')[1]+' '+Date().split(' ')[2]+' '+Date().split(' ')[3],
                        sender:req.user.name
                    }
                ],
                LatestMessage:{
                    Latestmessage:req.body.msgBody,
                    sentAt:Date().split(' ')[4]+' '+Date().split(' ')[1]+' '+Date().split(' ')[2]+' '+Date().split(' ')[3],
                    sender:req.user.name
                },
                seen:false
            })
            .then(done=>{
                usersarray=done.users
                console.log('done1')
            })
        }
        console.log('done2')
        return res.status(300).json({message:'sent','created':created,"latestMsg":latestMsg,"time":time,usersarray})
    })
    .catch(err=>{console.log('error in finding msg',err)
        return res.status(500).json({message:'error searching the DB'})
    })

}


module.exports.seeParticular=function(req,res){
//see the messages of a with a user
//req.uid
userdb.findOne({uid:req.query.uid}).then(foundTo=>{
    var ToName;
    var ToUid
    if(foundTo){
        ToName=foundTo.name;
        ToUid=foundTo.uid
    }else{
        ToName='User';
        ToUid=req.query.uid
    }
message.findOne({
    'users.uid':{$all:[req.user.uid,req.query.uid]}
}).then(foundParticular=>{
    if(foundParticular){
        if(foundParticular.LatestMessage.sender!=req.user.name){
            foundParticular.seen=true
            foundParticular.save()
        }
        if(foundParticular.users.length!=2){
            ToName=foundParticular.roomName
            ToUid=null
        }
        return res.status(200).json({
            ToName:ToName,
            ToUid:ToUid,
            foundParticular,
            message:'found chat'})
    }else{
        return res.status(400).json({
            ToName:ToName,
            ToUid:ToUid,
            foundParticular:null,
            message: 'Start with sending a message :)'});
    }
}).catch(err=>{
    return res.status(500).json({message:err})
})

}).catch(err=>{
    return res.status(500).json({message:err})
})
}

module.exports.seeAll=function(req,res){
//see all the chats
// console.log(req.user)
message.find({'users.uid':req.user.uid})
.then(foundAllChats=>{ 
    if(foundAllChats && foundAllChats !=[]){
        return res.status(200).json({
            foundAllChats,
            message:'found chats'})
    }else{
        return res.status(300).json({ message: 'Start with sending a message :)'});
    }
}).catch(err=>{
    return res.status(500).json({ message:'error'});
})
}


module.exports.mockAPI=function(req,res){
    message.findOne({'users.uid':req.user.uid}).then(found=>{
        if(found){
        found.messages.push({
            body:'please',
            sender:'Somiran 3.0',
            time:Date().split(' ')[4]+' '+Date().split(' ')[1]+' '+Date().split(' ')[2]+' '+Date().split(' ')[3],
        })
        found.save()
    }else{
            message.create({
             
                users:[
                    {
                        uid:35635690,
                        name:'Somiran 3.0'
                    },{
                        uid:12324,
                        name:'dude'
                    }
                ],
                messages:[
                    {
                        body:'dude',
                        time:Date().split(' ')[4]+' '+Date().split(' ')[1]+' '+Date().split(' ')[2]+' '+Date().split(' ')[3],
                        sender:'safasf'
                    }
                ],
                LatestMessage:{
                    Latestmessage:'?',
                    sentAt:Date().split(' ')[4]+' '+Date().split(' ')[1]+' '+Date().split(' ')[2]+' '+Date().split(' ')[3],
                    sender:'Somiran'
            }
            })
        }
    })
    .then(done=>{
        return res.status(300).json(done)
    })
    .catch(err=>{
        return res.status(500).json({message:err})
    })
}

module.exports.searchChat=function(req,res){
    if(!req.query.name || req.query.name=='' ||req.query.name==undefined){
        return res.status(400).json({message:'nothing to find'})
    }
    userdb.find({name:req.query.name}).then(searchedpfs=>{
        // console.log(searchedpfs)
        searchedpfs=searchedpfs.filter(pf=>pf.uid!=req.user.uid)
        if(searchedpfs && searchedpfs!=[]){
            let searchedOnes=[];
            searchedpfs.forEach(profile=>{
                searchedOnes.push({
                    name:profile.name,
                    uid:profile.uid
                })
            })
            return res.status(200).json({message:'found',searchedOnes})
        }else{
            return res.status(400).json({message:'profile not found'})
        }
    })
}