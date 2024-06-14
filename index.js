const express=require('express');
const http=require('http')
const app=express();
const port=700;
const cookieParser=require('cookie-parser');
//session-cookie
const session=require('express-session');
const passport =require('passport');
const passportLocal=require('./config/passport-local');
const flash=require('connect-flash')


app.use(express.static('assets'));

app.use(express.urlencoded());
app.use(cookieParser());



app.set('view engine','ejs');
app.set('views','./views');

const MongoStore = require('connect-mongo');
const errorcontroller=require('./controllers/error')
app.use(session({
    name:'SocioNode',
    //TODO-change the secret before deployment in productio mode
    secret:'randomsomethiasf',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:MongoStore.create({
        mongoUrl:'mongodb://localhost/socioNode_db',
        autoRemove:'interval',
        autoRemoveInterval:'100'//in minutes default
    },function(err){
        console.log('error in storing: ',err);
    })
    }))

app.use(flash())
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser)

app.use('/',require('./routes/index'));
app.use(errorcontroller.error404)

app.listen(port,function(err){
    if(err){console.log("error firing server");
        return;
    }else{
        console.log("successfully set up server with port:",port);
    }
})

//csrftoken
//install csrf
//use csrf
//send it to views with name:csrfToken:req.csrfToken()
//send the csrf on on every render with name _csrf
//to do this,save the csrf token in locals