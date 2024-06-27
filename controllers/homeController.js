// let home=(req,res)=>{
const profilesdb=require('../models/signup')

module.exports.home=function(req,res){
    profilesdb.findOne({_id:req.user.id,password:req.user.password}).then(founduser=>{
        return res.render('Homepage',{'user':{ 
            name:founduser.name,
            uid:founduser.uid,
        }})    
    })
};