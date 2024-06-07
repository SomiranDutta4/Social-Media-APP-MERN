const mongoose=require('mongoose');
const db=require('../config/PostMongoose');
const profilesdb=require('../models/signup');

module.exports.findprofile=function(req,res){

    console.log(req.user.name) 
    profilesdb.findOne({email:req.user.email,password:req.user.password}).then(founduser=>{
        return res.render('profiles',{'user':{
            name:founduser.name,
            email:founduser.email
        }})
    }).catch(err=>{
        console.log('an error occured')
        return res.redirect('/user/signin')
})
}

module.exports.signout=function(req,res){
    req.logout(function(er){
        if(er){return next(err);}
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
    return res.redirect('back')
}

module.exports.editemail=function(req,res){
    console.log("new:",req.body);
    profilesdb.updateOne({email:req.user.email},{$set:{email:req.body.email}}).then(done=>{
        console.log('successfully updated')
    }).catch(err=>{
        console.log('an error occured')
    })
    return res.redirect('back')
}

module.exports.editpassword=function(req,res){
    console.log("new:",req.body);
    profilesdb.updateOne({email:req.user.email,password:req.user.password},{$set:{password:req.body.password}}).then(done=>{
        console.log('successfully updated')
    }).catch(err=>{
        console.log('an error occured')
    })
    return res.redirect('back')
}

    // if(req.cookies!=undefined){
        // let requestedprofile='';
    
        // for(let i=0;i<req.path.length;i++){
        //     if(i==0){
        //         continue;
        //     }
        //     if(req.path[i]!='%'){
        //         requestedprofile+=req.path[i];
                
        //     }else if(req.path[i]=='%' && req.path[i+2]==0){
        //         requestedprofile+=' ';
        //         i+=2;
        //     }
        // }
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