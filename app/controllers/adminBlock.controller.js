
const config = require("../config/auth.config");
const sendEmail = require("../utils/email");
const db = require("../models");
const User = db.user;
var {TokenExpiredError}  = require("jsonwebtoken");
var jwt  = require("jsonwebtoken");



exports.create= async(req,res)=>{



  User.findOne({_id: req.userId}).exec(async (err,user)=>{
   if (err) {
     res.status(500).send({ message: err });
     return;
   }
   if(!user){
     res.status(404).send("admin user not found")
   }
if (user.isAdmin){
  let obj_id= req.query.userid
  let duration=req.body.duration

   await User.findById(obj_id).exec( async (err, blocked_user) => {
     if (err) {
       res.status(500).send({ message: err });
       return;
     }
     if(!blocked_user){
       res.status(404).send(" normal user not found")
     }
 if (blocked_user.isAdmin==false){
   await User.findByIdAndUpdate(obj_id,{ admin_block:{ blocked_by_admin: true,block_createdAt:new Date().getTime(),block_duration: duration }},{ returnDocument: 'after' }).exec(async(err,blockedUserConfirmed)=>{

     if (err) {
       res.status(500).send({ message: err });
       return;
     }
     res.status(200).send(blockedUserConfirmed)

   });
 }
  });
}
else{
  res.status(401).send("Unauthorized! you must be an admin")
}

});
};
