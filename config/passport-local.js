const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/signup')


passport.use(new LocalStrategy({
    usernameField:'email'
},
function(email,password,done){
    User.findOne({email:email}).then(user=>{
        if(!user ||user.password!=password){
            console.log('invalid username/password');
            return done(null,false);
        }
        // console.log(user);
        return done(null,user);
    }).catch(err=>{
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