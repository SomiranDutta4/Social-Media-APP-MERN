const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/socioNode_db');

const db=mongoose.connection;
db.on('err',console.error.bind(console,"error setting up database"));
db.once('open',function(){console.log('successfully connected to database')});
