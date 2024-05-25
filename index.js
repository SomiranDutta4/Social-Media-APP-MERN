const express=require('express');
const app=express();
const port=700;
const cookieParser=require('cookie-parser');
app.use(express.static('assets'));
app.set('view engine','ejs');
app.set('views','./views');
app.use(express.urlencoded());
app.use(cookieParser());
app.use('/',require('./routes/index'));


app.listen(port,function(err){
    if(err){console.log("error firing server");
        return;
    }else{
        console.log("successfully set up server with port:",port);
    }
})