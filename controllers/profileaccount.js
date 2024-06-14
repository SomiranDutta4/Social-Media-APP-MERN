const mongoose=require('mongoose');
const db=require('../config/PostMongoose');
const profilesdb=require('../models/signup');
const bcrypt=require('bcryptjs');
const posts=require('../models/Post')

module.exports.findprofile=function(req,res){
    //console.log(req.user.name) 
    profilesdb.findOne({email:req.user.email,password:req.user.password}).then(founduser=>{
        posts.find({authoruid:founduser.uid}).then(foundposts=>{
//            console.log(foundposts[0].Commenters[2])
            return res.render('profiles',{'user':{
                name:founduser.name,
                email:founduser.email,
                uid:founduser.uid
            },'posts':foundposts})
        })
    }).catch(err=>{
        console.log('an error occured')
        return res.redirect('/user/signin')
})
}

module.exports.signout=function(req,res){
    req.logout(function(err){
        if(err){return next(err);}
        res.redirect('/user/signin')
    })
}
module.exports.editprofile=function(req,res){
    return res.render('editprofile',{'user':req.user})
}

module.exports.editname=function(req,res){
    console.log("new:",req.body);
    profilesdb.updateOne({email:req.user.email,name:req.user.name},{$set:{name:req.body.name}}).then(done=>{
        console.log('successfully updated')
    }).catch(err=>{
        console.log('an error occured')
    })
    posts.updateMany({authoruid:req.user.uid},{$set:{author:req.body.name}}).then(done=>{
        // console.log(done)
    })
    //posts.updateMany({'likers.uid':req.user.uid},{$set:{'likers.$.author':req.body.name}})
    //posts.updateMany({'Commenters.uid':req.user.uid},{$set:{'likers.$.name':req.body.name}})
    return res.redirect('back')
}

module.exports.editemail=function(req,res){
    console.log("new:",req.body);
    profilesdb.updateOne({email:req.user.email},{$set:{email:req.body.email}}).then(done=>{
        console.log('successfully updated')
    }).catch(err=>{
        console.log('an error occured')
    })
    //posts.updateMany({authorEmail:req.user.email},{$set:{authorEmail:req.body.email}}).then(done=>{
        // console.log(done)
   //})
    //posts.updateMany({'likers.uid':req.user.email},{$set:{'likers.$.email':req.body.email}})
   // posts.updateMany({'Commenters.email':req.user.email},{$set:{'likers.$.email':req.body.email}})
   
    return res.redirect('back')
}

module.exports.editpassword=function(req,res){
    let password=req.body.passsword;
    console.log("new:",req.body);
    bcrypt.hash(password).then(hashedpass=>{
        profilesdb.updateOne({email:req.user.email},{$set:{password:req.body.password}}).then(done=>{
            console.log('successfully updated')
        }).catch(err=>{
            console.log('an error occured')
        })
    })
    return res.redirect('back')
}

module.exports.createPost=function(req,res){
    posts.create({
        content:req.body.content,
        author:req.user.name,
        authoruid:req.body.uid
    }).then(created=>{
        return res.redirect('/profile/account')
    }).catch(err=>{
        console.log('some error occured while posting')
        return res.redirect('back')
    })
}
module.exports.createcomment=function(req,res){
    //console.log(req.body)
    let comment;
    let commenters;
    
    const newcomment={
        body:req.body.comment,
        author:req.user.name
    }

    posts.findById(req.body.id).then(foundpost=>{
        comment=foundpost.comments
        comment++;
        commenters=foundpost.Commenters
        commenters.push(newcomment);
        //console.log(comment,commenters)
    }).then(done=>{
    posts.updateOne({_id:req.body.id},{$set:{comments:comment,Commenters:commenters}}).then(done=>{
        return res.redirect('back');
    }).catch(err=>{
        console.log('error commenting')
        return res.redirect('back');
    })  })
}
module.exports.like=function(req,res){
    let likes;
    posts.findById(req.user.id).then(foundpf=>{
        likes=foundpf.likes
    })
    posts.updateOne({_id:req.user.id},{$set:{likes:likes+1}})

    return res.redirect('back')
}

module.exports.postpage=function(req,res){
    return res.render('createpost',{'user':{
        uid:req.body.uid
    }})
}

module.exports.profilesearch=function(req,res){
    profilesdb.findOne({uid:req.body.uid})
    .then(founduser=>{
        if(founduser){
        posts.find({authoruid:founduser.uid}).then(foundposts=>{
            return res.render('searchedprofile',{'searcheduser':{
                name:founduser.name,
                uid:founduser.uid
            },'posts':foundposts})
        })}else{console.log('no such user')
            return res.redirect('back')}
    }).catch(err=>{
        console.log('an error occured')
        return res.redirect('back')
})}

module.exports.postcomment=function(req,res){
    posts.find({})
}
    // profilesdb.findOne({uid:req.body.uid}).then(found=>{
    //     if(found){

    //         return res.render('profiles',{'user':{
    //             name:found.name,
    //             email:found.email
    //         },'posts':foundposts})
    //     }
    // })
//     return res.redirect('back')
// }

// if(req.cookies!=undefined){
//         let requestedprofile='';
    
//         for(let i=0;i<req.path.length;i++){
//             if(i==0){
//                 continue;
//             }
//             if(req.path[i]!='%'){
//                 requestedprofile+=req.path[i];
                
//             }else if(req.path[i]=='%' && req.path[i+2]==0){
//                 requestedprofile+=' ';
//                 i+=2;
//             }
//         }
        // console.log('USER:',requestedprofile);
//     profilesdb.findOne({'_id':req.cookies.user}).then(founditt=>{
//         if(founditt){
            
//             // if(founditt.name==requestedprofile){

//             return res.render('profiles',{'user':{
//                 name:founditt.name,
//                 email:founditt.email
//             }})

//             // }else{
//             //     return res.redirect('/profile/signin');
//             // }
//         }else{
//             return res.redirect('/user/signin');
//         }
//     }).catch(err=>{
//         console.log('some error encountered')
//         return res.redirect('/user/signin');
//     })
// }else{
//         return res.redirect('/user/signin');
//     }
//}