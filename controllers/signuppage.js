const mongoose=require('mongoose');
const db=require('../config/PostMongoose')
const dataindb=require('../models/signup');
const returnnewpf=require('./profileaccount');
const bcrypt=require('bcryptjs');
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

module.exports.signupfunction=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/profile/account')
    }
    let message=req.flash('error')
    if(message){
        if(message.length>0){
            message=message[0]
        }else{
            message=null
        }
    }

    return res.render('signuppage',{
        'errorMessage':message
    });
}

module.exports.signuprequest=function(req,res){
    let password=req.body.password;
    // console.log(req.body);
    const requestedemail=req.body.email;

    dataindb.findOne({"email":requestedemail}).then(foundduplicate=>{if(foundduplicate){

        console.log("already have a profile with:",req.body.email);
        req.flash('error','Email already registered')
        // return res.render('signuppage',{
        //     'errorMessage':errorMessage
        // });
        return res.redirect('/user/signup')
    }
        else{
            let randomuid=randomnum();
            let randomotp=Math.floor(Math.random()*900000)+100000;
            dataindb.create({
                email:'NULL@null',
                password:'NULL',
                name:'NULL',
                uid:0,
                otp:randomotp,
                validTill:Date.now()+(10*60*1000)
            });
            transporter.sendMail({
                from:{
                    name:'SocioNode',
                    address:'noReply@SocioNode.user'
                },
                to:req.body.email,
                subject:'Verify your SocioNode email',
                text:`your six-digit verification code for SocioNode Account is:${randomotp}`,
                html:`<div>
                <h2>Your six-digit verification code for your signed email is:</h2>
                <h1>${randomotp}</h1>
                <p>This code is valid only for 10 minutes</p>
                <p>Do not to share sensitive informations including verification codes to anyone</p>
                </div>`
            }).then(done=>{
               // return res.redirect('/')
            }).catch(err=>{
                // console.log(err)
                console.log('unknown error')
                req.flash('error','Some Server Side issue occured')
                return res.redirect('/user/signup')
        });
        password=bcrypt.hash(password,12).then(hashedpassword=>{
            return res.render('verify',{'user':{
                email:req.body.email,
                password:hashedpassword,
                name:req.body.firstname+' '+req.body.lastname,
                uid:randomuid,
                otp:randomotp
            }})});
        }
    })}

module.exports.verifieduser=function(req,res){
    if(req.body.otp!=req.body.submittedotp){
        console.log('wrong code submitted')
        dataindb.deleteMany({uid:0}).then(result=>{
            // console.log(result)
        }).catch(err=>{
            const error=new Error(err);
            error.httpStatusCode=500;
            return next(error)
            // console.log(err)
        })
        
        req.flash('error','Wrong code submitted')
        return res.redirect('/user/signup')
    }
    dataindb.findOne({ 
        otp:req.body.otp,
        validTill:{ $gt: Date.now() }
    }).then(found=>{
        if(found){
            dataindb.updateOne({otp:req.body.otp},{$set:{otp:0,
                email:req.body.email,
                password:req.body.password,
                name:req.body.name,
                uid:req.body.uid
            }})
            // dataindb.create({
            //     email:req.body.email,
            //     password:req.body.password,
            //     name:req.body.name,
            //     uid:req.body.uid
            // })
            .then(created=>{
                console.log('successfully created')
                transporter.sendMail({
                    from:{name:'SocioNode',
                        address:'Mailer@SocioNode.user'},
                        to:req.body.email,
                        subject:'successfully Signed up to SocioNode',
                        text:'successfully Signed up',
                        html:`<div>
              <h1>Welcome to SocioNode!</h1>
              <h2>You have successfully signed up to SocioNode.</h2>
              <p>Start exploring, connecting, and sharing with others.</p>
              <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
              <p>Best regards,<br/>The SocioNode Team</p>
            </div>`
                })
                // .then(done=>{
                    console.log('success')
                    return res.redirect('/')
                // }).catch(err=>{
                //     console.log('failure')
                //     return res.redirect('/user/signup');
                // })
            }).catch(err=>{
                dataindb.deleteMany({uid:0})
                const error=new Error(err);
                error.httpStatusCode=500;
                return next(error)
            })
        }else{
            dataindb.deleteMany({uid:0}).then(result=>{
                console.log(result)
            })
            console.log('expired OTP')
           req.flash('error','the security code expired')
           return res.redirect('/user/signup')
            // return res.redirect('/user/signup')
        }
    }).catch(err=>{
        dataindb.deleteMany({uid:0})
        const error=new Error(err);
        error.httpStatusCode=500;
        return next(error)
    })
}





// .then(newprofile=>{
  
  
//             console.log('successfully created new rofile with email: ',req.body.email)
//             return res.redirect('/user/signin');
//         })
//         }).catch(err=>{
//             console.log('error finding profile')
//             return res.redirect('/')
//         })        
// }


// module.exports.signupfunction=function(req,res){
//     if(req.isAuthenticated()){
//         return res.redirect('/profile/account')
//     }
//     return res.render('signuppage');
// }

// module.exports.signuprequest=function(req,res){
//     let password=req.body.password;
//     // console.log(req.body);
//     const requestedemail=req.body.email;

//     dataindb.findOne({"email":requestedemail}).then(foundduplicate=>{if(foundduplicate){

//         console.log("already have a profile with:",req.body.email);
//         return res.redirect('back');}
        
//         let randomuid=randomnum();
//             password=bcrypt.hash(password,12).then(hashedpassword=>{
//                 dataindb.create({
//                     email:req.body.email,
//                     password:hashedpassword,
//                     name:req.body.firstname+' '+req.body.lastname,
//                     uid:randomuid
//                 })
//             }
//         )
// .then(newprofile=>{
//     transporter.sendMail({

//         from:{
//             name:'SocioNode',
//             address:'Verify@SocioNode.user'
//         },
//         to:req.body.email,
//         subject:'Verify your SocioNode email',
//         text:'your six-digit verification code for SocioNode Account is:',
//         html:`<h1>${Math.floor(Math.random()*1000000)}</h1>`
//         // from:{name:'SocioNode',
//         //     address:'Mailer@SocioNode.user'},
//         //     to:req.body.email,
//         //     subject:'successfully Signed up to SocioNode',
//         //     text:`user with email ${req.body.email}: successfully signed up to SocioNode, for any queries, visit www.youtube.com`,
//         //     html:'<h1>Successfully Signed up </h1>'
//     }).then(done=>{
//         return res.render('verify',{'user':{
//             email:req.body.email,
//             password:hashedpassword,
//             name:req.body.firstname+' '+req.body.lastname,
//             uid:randomuid
//         }});
//        // return res.redirect('/')
//     }).catch(err=>{
//         // console.log(err)
//         console.log('email doesn.t exist')
//         return res.redirect('/user/signin')
// });
  
//             console.log('successfully created new rofile with email: ',req.body.email)
//             return res.redirect('/user/signin');
//         })
//         }).catch(err=>{
//             console.log('error finding profile')
//             return res.redirect('/')
//         })        
// }



function randomnum(){
    let randomuid=Math.floor(Math.random()*100000000);
    dataindb.findOne({uid:randomuid}).then(found=>{
        if(found){randomnum()}
    })
    return randomuid;
}