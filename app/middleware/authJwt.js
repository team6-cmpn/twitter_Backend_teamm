const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

const { TokenExpiredError } = jwt;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      if (err instanceof TokenExpiredError) {
        return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
      }
      return res.sendStatus(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    ///////////////////////////////////////////////////////////////////////////////////////////////

    User.findOne({_id: req.userId}).exec(async (err,user)=>{
     if (err) {
       res.status(500).send({ message: err });
     }

  if (user){
    if ( user.admin_block.blocked_by_admin){
      current=  new Date().getTime()
      blockCreationDate= user.admin_block.block_createdAt
      var Difference_In_Time = current - blockCreationDate;  // diffrience in milliseconds
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);  // number of milliseconds per day

      if(Difference_In_Days> user.admin_block.block_duration){
        blocktimes=user.admin_block.blockNumTimes
         await User.findByIdAndUpdate( req.userId,{ admin_block:{ blocked_by_admin:false, blockNumTimes: blocktimes  }},{ returnDocument: 'after' }).exec((err,user)=>{
          if (err){
            res.status(500).send({ message: err });
            return;
  }})}}}})
  
/////////////////////////////////////////////////////////////////////////////////////////////////////
    next();
  });
};


checkIsAdmin = (req, res, next) => {

  User.findOne({_id: req.userId}).exec(async(err,user)=>{
   if (err) {
     res.status(500).send({ message: err });
     return;
   }
   /*
   if(!user){

     res.status(404).send("admin user not found")
   }
   */
   if (user){
     if (user.isAdmin==false){
       res.status(403).send({ message: "Forbidden, you must be an admin" })
     }
     else{

         next()
     }
   }
})
}



checkAdminBlockTweet = (req, res, next) => {


  User.findOne({_id: req.userId}).exec(async (err,user)=>{
   if (err) {
     res.status(500).send({ message: err });
     return;
   }

if (user){


     if ( user.admin_block.blocked_by_admin){
       current=  new Date().getTime()
       blockCreationDate= user.admin_block.block_createdAt
       var Difference_In_Time = current - blockCreationDate;  // diffrience in milliseconds
       var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);  // number of milliseconds per day

         if (  Difference_In_Days<= user.admin_block.block_duration )
         {
           duration=user.admin_block.block_duration
           startFromDate= user.admin_block.block_createdAt
           startFromDate= startFromDate.toDateString()
           res.status(400).send({message: "you can't do this action, you are blocked by admin for "+String(duration)+" days "+ "starting from "+String(startFromDate)})
         }
    }

     if(user.admin_block.blocked_by_admin==false || Difference_In_Days> user.admin_block.block_duration){
       blocktimes=user.admin_block.blockNumTimes
        await User.findByIdAndUpdate( req.userId,{ admin_block:{ blocked_by_admin:false, blockNumTimes: blocktimes  }},{ returnDocument: 'after' }).exec((err,user)=>{
         if (err){
           res.status(500).send({ message: err });
           return;
         }
         next();
       });
}
}

if (!user){
    res.status(404).send({message: "user not found"})
}
})}
////////////////////////////////////////////

//////////////////////////////////////////
checkAdminBlockCreate = (req, res, next) => {

  User.findOne({_id: req.query.userid}).exec(async (err,user)=>{
   if (err) {
     res.status(500).send({ message: err });
     return;
   }
if (user){
     if ( user.admin_block.blocked_by_admin){
       current=  new Date().getTime()
       blockCreationDate= user.admin_block.block_createdAt
       let Difference_In_Time = current - blockCreationDate;  // diffrience in milliseconds
       let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);  // number of milliseconds per day

         if (  Difference_In_Days<= user.admin_block.block_duration )
         {
           duration=user.admin_block.block_duration
           startFromDate= user.admin_block.block_createdAt
           startFromDate= startFromDate.toDateString()
           res.status(400).send({message: "this user is already blocked for "+String(duration)+" days "+ "starting from "+String(startFromDate)})
         }


     if( Difference_In_Days> user.admin_block.block_duration){
       blocktimes=user.admin_block.blockNumTimes
        await User.findByIdAndUpdate( user._id,{ admin_block:{ blocked_by_admin:false,blockNumTimes: blocktimes  }},{ returnDocument: 'after' }).exec((err,user)=>{
         if (err){
           res.status(500).send({ message: err });
           return;
         }
         next();
       });
}
}
 if ( user.admin_block.blocked_by_admin==false){
   next();
 }
}
if (!user){
  res.status(404).send({message: "user not found"})
}
})}



//////////////////////////////////////////

const authJwt = {
  verifyToken,
  checkIsAdmin,
  checkAdminBlockTweet,
  checkAdminBlockCreate
};
module.exports = authJwt;
