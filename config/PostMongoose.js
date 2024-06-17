const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/socioNode_db');

const db=mongoose.connection;
db.on('err',console.error.bind(console,"error setting up database"));
db.once('open',function(){console.log('successfully connected to database')});


// const MONGO_URI='mongodb+srv://somirandutta46:l6kDDAYWkAePgA4V@cluster0.cgr8aoq.mongodb.net/shopping?retryWrites=true&w=majority&appName=Cluster0'
// mongoose.connect(MONGO_URI)
// .then(result=>{
//     console.log('connected to database')
// })
// .catch(err=>{
//     console,log(err)
// })