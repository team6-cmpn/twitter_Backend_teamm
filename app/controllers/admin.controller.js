
const config = require("../config/auth.config");
const sendEmail = require("../utils/email");
const db = require("../models");
const User = db.user;
const Tweet= db.tweet;
var {TokenExpiredError}  = require("jsonwebtoken");
var jwt  = require("jsonwebtoken");





exports.showUsers = async (req, res) => {
  User.findOne({_id: req.userId}).exec(async(err,user)=>{
   if (err) {
     res.status(500).send({ message: err });
     return;
   }
   if(!user){
     res.status(404).send("admin user not found")
   }
if (user.isAdmin)
{
  await User.find({}).exec((err,found_users)=>{
    if (err){
      res.status(500).send({ message: err})
      return;
    }

    if(!found_users){
      res.status(404).send(" users not found")
    }

    res.status(200).send(found_users)
  });

}
else{
  res.status(401).send("Unauthorized! you must be an admin")
}


});
};



exports.getStatistics= async (req,res)=>{
  static=[]
  let allusers_count = new Object()
  let top_followers = new Object()
  let  alltweets_count= new Object()
//console.log(Tweet)
      await User.countDocuments().exec((err,usercount)=>{
      if (err){
        res.status(500).send({ message: err})
        return;
      }
       allusers_count.ALL_Users_Count=usercount
      static.push(allusers_count)
        User.find({}).sort({followers_count:-1}).limit(2).select("username followers_count -_id ").exec(async (err,top)=>{
        if (err){
          res.status(500).send({ message: err})
          return;
        }
        top_followers.top_users_with_followers=top
        static.push(top_followers)
          res.send(static)
/*
        await Tweet.countDocuments().exec((err,tweetcount)=>{
        if (err){
          res.status(500).send({ message: err})
          return;
        }
          alltweets_count.ALL_Tweets_Count=tweetcount
        static.push(alltweets_count)

        res.send(static)
      });
      */
      });

    });

};
