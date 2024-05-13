// let home=(req,res)=>{

//     return res.end("<h1>This is the HomePage</h1>");
// }
//this form is wrong

module.exports.home=function(req,res){
    return res.end("<h1>This is the homepage</h1>")
};