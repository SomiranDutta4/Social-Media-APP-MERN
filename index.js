const express=require('express');
const app=express();
const port=700;

app.listen(port,function(err){
    if(err){console.log("error firing server");
        return;
    }else{
        console.log("successfully set up server with port: ",port);
    }
})