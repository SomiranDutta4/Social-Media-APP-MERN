const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/signup')
const bcrypt=require('bcryptjs')


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
passport.use(new LocalStrategy({
    usernameField:'email'
},
function(email,password,done){
    User.findOne({email:email}).then(user=>{

        if(!user){
            //req.flash('error','Invalid Email entered')
            console.log('invalid email');
            // return done(null,false,{message:'Invalid Email entered'});
            return done(null,false)
        }

        bcrypt.compare(password,user.password).then(result=>{
            if(result){
                return done(null,user);
            }
            //req.flash('error','Entered passwored was incorrect')
            console.log('wrong password')
            return done(null,false)

        })
        // console.log(user);
        // return done(null,user);
    }
)
.catch(err=>{
        return done(err);
    })
}
))

passport.serializeUser(function(user,done){
    done(null,user.id);
})

passport.deserializeUser(function(id,done){
    User.findById(id).then(user=>{
        // console.log(user);
        return done(null,user);
    }).catch(err=>{
        console.log('error finding user-->passport')
        return done(err)
    })
})


passport.checkAuthincation=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/user/signin')
}
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    return next()
}

module.exports=passport