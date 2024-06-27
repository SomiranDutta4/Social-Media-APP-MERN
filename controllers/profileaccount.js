const mongoose=require('mongoose');
const db=require('../config/PostMongoose');
const profilesdb=require('../models/signup');
const bcrypt=require('bcryptjs');
const posts=require('../models/Post')
const nodemailer=require('nodemailer')
// const sendgridTransport=require('nodemailer-sendgrid-transport');


   const transporter= nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    secure:true,
    port:465,
    auth:{
        user:'nodesocio@gmail.com',  
        pass:'vvzb jfgs qldp cdiz'
    }
})


module.exports.findprofile=function(req,res){
    //console.log(req.user.name) 
    profilesdb.findOne({_id:req.user.id,password:req.user.password}).then(founduser=>{
        posts.find({authoruid:founduser.uid}).then(foundposts=>{

            return res.render('profiles',{'user':{
                name:founduser.name,
                email:founduser.email,
                uid:founduser.uid,
                bio:founduser.bio
            },'posts':foundposts,
            'loggedInUser':req.user.uid
        })
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
    let errorMessage=req.flash('error')
    if(errorMessage && errorMessage.length>0){
        errorMessage=errorMessage[0]
    }else{
        errorMessage=null
    }

    let successMessage=req.flash('success')
    // console.log(successMessage)
    if(successMessage && successMessage.length>0){
        successMessage=successMessage[0]
    }else{
        successMessage=null
    }
    return res.render('editprofile',{'user':{
        name:req.user.name,
        bio:req.user.bio,
        uid:req.user.uid,
        email:req.user.email,
    },
    errorMessage:errorMessage,
    successMessage:successMessage})
}

module.exports.editname=function(req,res){
    if(req.body.name==req.user.name){
        req.flash('error','The new Name should not be same as previous one')
        return res.redirect('back')
    }
    if(req.body.uid!=req.user.uid){
        req.flash('error','Some error occured, Please login again')
        return res.redirect('/user/signin');
    }
    console.log("new name:",req.body.name);
    profilesdb.updateOne({uid:req.body.uid},{$set:{name:req.body.name}}).then(done=>{
        req.flash('success','successfully updated name')
        console.log('successfully updated')
    }).catch(err=>{
        req.flash('error','an unknown error occured, status:500')
        console.log('an error occured')
    })
    posts.updateMany({authoruid:req.body.uid},{$set:{author:req.body.name}}).then(done=>{
        // console.log(done)
    }).catch(err=>{
        req.flash('error','an unknown error occured, status:500')
    })
    //posts.updateMany({'likers.uid':req.user.uid},{$set:{'likers.$.author':req.body.name}})
    //posts.updateMany({'Commenters.uid':req.user.uid},{$set:{'likers.$.name':req.body.name}})
    return res.redirect('back')
}

module.exports.editemail=function(req,res){
    if(req.body.email==req.user.email){
        req.flash('error','The new Email should not be same as previous one')
        return res.redirect('back')
    }

    console.log("new email:",req.body.email);
    profilesdb.updateOne({uid:req.body.uid},{$set:{email:req.body.email}}).then(done=>{
        req.flash('success','successfully updated Email')
        console.log('successfully updated')
    }).catch(err=>{
        req.flash('error','an unknown error occured, status:500')
        console.log('an error occured')
    })
    //posts.updateMany({authorEmail:req.user.email},{$set:{authorEmail:req.body.email}}).then(done=>{
        // console.log(done)
   //})
    //posts.updateMany({'likers.uid':req.user.email},{$set:{'likers.$.email':req.body.email}})
   // posts.updateMany({'Commenters.email':req.user.email},{$set:{'likers.$.email':req.body.email}})
   
    return res.redirect('back')
}


module.exports.editbio=function(req,res){

    console.log("new bio:",req.body.bio);
    profilesdb.updateOne({uid:req.body.uid},{$set:{bio:req.body.bio}}).then(done=>{
        req.flash('success','successfully updated Bio')
        console.log('successfully updated')
    }).catch(err=>{
        req.flash('error','an unknown error occured, status:500')
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
    console.log(req.body)

    if(req.body.oldpasssword=='' || req.body.newpassword=='' ||req.body.confirmpassword==''){
        req.flash('error','Password cannot be empty')
    }

    if(req.body.newpassword!=req.body.confirmpassword){
        req.flash('error','The passwords did not match')
        return res.redirect('back')
    }


    bcrypt.compare(req.body.oldpassword,req.user.password).then(result=>{
        if(result){

            bcrypt.compare(req.body.newpassword,req.user.password).then(result=>{
                if(result){
                    req.flash('error','The new password should be different from the old one')
                    return res.redirect('back')
                }else{
                    let randomotp=Math.floor(Math.random()*900000)+100000;

                    profilesdb.findOne({uid:req.body.uid}).then(foundpf=>{
        
                        transporter.sendMail({
                            from:{
                                name:'SocioNode',
                                address:'noReply@SocioNode.user'
                            },
                            to:foundpf.email,
                            subject:'Req for Changing your SocioNode password',
                            text:`your six-digit verification code for password of SocioNode Account is:${randomotp}`,
                            html:`<div>
                            <h2>Your six-digit verification code for changing password of your SocioNode account is:</h2>
                            <h1>${randomotp}</h1>
                            <p>This code is valid only for 10 minutes</p>
                            <p>Do not to share sensitive informations including security codes to anyone</p>
                            </div>`
                        }).then(done=>{
                            // req.flash('success','A confirmation code has been sent to your registered email');
                        }).catch(err=>{
                            req.flash('error','There was an error in sending the message: Status(500)')
                            return res.redirect('/profile/edit')
                        })
                    
                        // let errorMessage=req.flash('error')
                        // if(errorMessage && errorMessage.length>0){
                        //     errorMessage=errorMessage[0]
                        // }else{
                        //     errorMessage=null
                        // }
                    
                        // let successMessage=req.flash('success')
                        // // console.log(successMessage)
                        // if(successMessage && successMessage.length>0){
                        //     successMessage=successMessage[0]
                        // }else{
                        //     successMessage=null}
                        console.log(req.body)
                            let newpassword=bcrypt.hash(req.body.newpassword,12).then(hashedpassword=>{
                                console.log(newpassword)
                                profilesdb.updateOne({uid:req.body.uid},{$set:{otp:randomotp,validTill:Date.now()+(10*60*1000)}}).catch(err=>{
                                    res.flash('error',err);
                                    return res.redirect('back')
                                })
        
                                return res.render('verify/verifypasswordchange',{'user':{
                                    otp:randomotp,
                                    uid:req.body.uid,
                                    newpassword:hashedpassword
                                },
                                errorMessage:null,
                                successMessage:"A security code has been sent to your registered email"
                            })
        
                            })
        
                            
                    }).catch(err=>{
                        console.log(err)
                        req.flash('error','some unknown error occured: Status(500)')
                        return res.redirect('back')
                    })
                }
            })
        }else{
            req.flash('error','The entered old Password was wrong')
            return res.redirect('back')
        }
    })   
 }


module.exports.verifiedPassEdit=function(req,res){

    profilesdb.findOne({uid:req.body.uid}).then(foundpf=>{
        if(foundpf){
            if(foundpf.otp!=req.body.submittedotp){
                req.flash('error','Wrong code submitted')
                return res.redirect('/profile/edit')
            }
            if(foundpf.otp==req.body.submittedotp){
                if(foundpf.validTill>Date.now()){
                    profilesdb.updateOne({uid:req.body.uid},{$set:{otp:0,
                        password:req.body.password,
                        validTill:Date.now()
                    }})
                    .then(created=>{
                        console.log('successfully updated')
                        transporter.sendMail({
                            from:{name:'SocioNode',
                                address:'NoReply@SocioNode.user'},
                                to:foundpf.email,
                                subject:'SocioNode password changed',
                                text:'Password successfully updated for your SocioNode Account',
                                html:`<div>
                      <h1>The password for your SocioNode Account registered with this email has been changed</h1>
                      <p>If this was not you, please re-change your password.</p>
                      <p>Best regards,<br/>The SocioNode Team</p>
                    </div>`
                        })
                        req.flash('success','successfully updated password')
                            console.log('success')
                            return res.redirect('/profile/edit')
                    }).catch(err=>{  
                        const error=new Error(err);
                        error.httpStatusCode=500;
                        return next(error)
                    })
                }else{
                    console.log('expired OTP')
                   req.flash('error','the security code expired')
                   return res.redirect('/profile/edit')
                    // return res.redirect('/user/signup')
                }}


        }else{
            req.flash('error','Account does not exist')
        }
    }).catch(err=>{
        req.flash('error','some error occured: Status(500)')
        return res.redirect('/profile/edit')
    })
}


module.exports.createPost=function(req,res){
    var imageURL;
    if(req.file){
        imageURL=req.file.path
        imageURL=imageURL.replace('\\','/')
    }else{
        imageURL=null
    }
    // console.log(req.file)
    // if(req.file){
    //     imageURL=req.file
    // }else{
    //     imageURL=null
    // }
    if(!req.body.content && !req.file){
        req.flash('error',"Post can't be empty")
        return res.redirect('back')
    }
    posts.create({
        content:req.body.content,
        author:req.user.name,
        authoruid:req.body.uid,
        image:imageURL
    }).then(created=>{
        return res.redirect('/profile/account')
    }).catch(err=>{
        // console.log(err)
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
        foundpost.Commenters.push(newcomment)
        foundpost.comments+=1;
        return foundpost.save()
        // comment=foundpost.comments
        // comment++;
        // commenters=foundpost.Commenters
        // commenters.push(newcomment);
        //console.log(comment,commenters)
    }).then(done=>{
    // posts.updateOne({_id:req.body.id},{$set:{comments:comment,Commenters:commenters}}).then(done=>{
    //     return res.redirect('back');
    // }).catch(err=>{
    //     console.log('error commenting')
    //     return res.redirect('back');
    // })  
    console.log('done commenting')
})
}
module.exports.like=function(req,res){
    posts.findOne({_id:req.query.id}).then(foundpost=>{
        // console.log(foundpost.likers)
        let likes=foundpost.likes
        let likersarray=foundpost.likers
        if(!likersarray){
            likersarray=[]
        }
        var likedbyUser=true
        if(req.query.status=='likepostbtnno'){
            likedbyUser=false
        }

        if(likedbyUser){
            likes+=1
            likersarray.push(
                {
                    author:req.user.name,
                    uid:req.user.uid
                }
            )
        }else{
            likes=likes-1
            likersarray=likersarray.filter(obj=>
                obj.uid!=req.user.uid)
        }
        foundpost.likes=likes;
        foundpost.likers=likersarray;
        foundpost.save()
        res.status(200).json({ message: 'Success!'});
        return
        
    //     posts.updateOne({_id:req.query.id},{$set:{likes:likes,likers:likersarray}}).then(done=>{
    //         
    //         // console.log('')
    //     }).catch(err=>{
    //         res.status(500).json({ message: 'Deleting product failed.'})
    // })
    
    }).catch(err=>{
        console.log('posts not found',err)
    })
    // console.log(likersarray,likes)
    // console.log(likersarray)
    // return res.redirect('back')
}

module.exports.postpage=function(req,res){
    let errorMessage=req.flash('error');
    if(errorMessage.length>0){
       errorMessage=errorMessage[0]
    }else{
        errorMessage=null
    }
    return res.render('createpost',{'user':{
        uid:req.user.uid
    },  errorMessage:errorMessage,})
}

module.exports.profilesearch=function(req,res){
    profilesdb.findOne({uid:req.body.uid})
    .then(founduser=>{
        if(founduser){
        posts.find({authoruid:founduser.uid}).then(foundposts=>{
            return res.render('searchedprofile',{'searcheduser':{
                name:founduser.name,
                uid:founduser.uid
            },'posts':foundposts,
            'loggedInUser':req.user.uid
               })
        })}else{console.log('no such user')
            return res.redirect('back')}
    }).catch(err=>{
        console.log('an error occured')
        return res.redirect('back')
})}



module.exports.editpostcontent=function(req,res){
    if(req.query.uid!=req.user.uid){
        req.flash('error','Please login to continue')
        return res.redirect('/user/login')
    }
    posts.updateOne({authoruid:req.query.uid,_id:req.query.index},{$set:{content:req.body.newpostcontent}}).then(done=>{
        // console.log(done)
    }).catch(err=>{
        req.flash('error',err);
    })
    return res.redirect('back')
}

module.exports.deletepost=function(req,res){
    if(req.query.uid!=req.user.uid){
        req.flash('error','Please login to continue')
        return res.redirect('/user/login')
    }
    posts.deleteOne({authoruid:req.query.uid,_id:req.query.index}).then(done=>{
        // console.log(done)
    }).catch(err=>{
        req.flash('error',err);
    })
    return res.redirect('back')
}


// app.get('/delete/:contact/:name',function(req,res){
//     console.log(req.params.name);
//     console.log(req.params.contact);
//     for(let i of contactList2){
//         if(i.name==req.params.name){
//             contactList2.splice(i,1);
//             return res.redirect('back');
//         }
//     }
// //urlencoded does not read params
// })
// app.get('/delete/',function(req,res){
//     console.log(req.query);
//     Contact.findByIdAndDelete(req.query.id).then(()=>{
//         console.log("successfully deleted the contact");
//         return res.redirect('back');
//     }).catch(()=>{
//         console.log("failed to delete contact");
//         return res.redirect('back');
//     })
    






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