
require("dotenv").config();
const config = require("../config/auth.config");
const db = require("../models");
const Tweet = db.tweet;
const User = db.user;
var {TokenExpiredError}  = require("jsonwebtoken");
var jwt  = require("jsonwebtoken");
const { tweet, user } = require("../models");
const { findOneAndDelete } = require("../models/user.model");
//const { post } = require("../../app");



exports.update=  async(req,res)=>{
  User.findOne({_id: req.userId}).exec(async (err,user)=>{
   if (err) {
     res.status(500).send({ message: err });
     return;
   }
   if(!user){
     res.send("user not found")
   }

    if ( user.admin_block.blocked_by_admin){
      current=  new Date().getTime()
      blockCreationDate= user.admin_block.block_createdAt
      var Difference_In_Time = current - blockCreationDate;  // diffrience in milliseconds
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);  // number of milliseconds per day
      console.log(Difference_In_Days)

        if (  Difference_In_Days<= user.admin_block.block_duration )
        {
            res.send({message:"this user cant tweet he is blocked by admin"})
        }
  }

    if(user.admin_block.blocked_by_admin==false || Difference_In_Days> user.admin_block.block_duration){
      await User.findByIdAndUpdate( req.userId,{ admin_block:{ blocked_by_admin:false  }},{ returnDocument: 'after' }).exec((err,user)=>{
        if (err){
          res.status(500).send({ message: err });
          return;
        }
        //res.send("you can post tweet here")

        const tweet = new Tweet({
        created_at: req.body.created_at,
        text: req.body.text,
        user: req.userId,
        source: req.body.source,
        //favorites:req.body.favorites,
      }) ;
      Tweet.findOne({text:req.body.text}).exec(async (err,tweetText)=>{
        if(err){
          res.status(403).send({ message: err });
        }
        if(tweetText){
          res.status(403).send({ message:"tweet duplication"});
        }
        if(!tweetText){
          tweet.save()

          .then(newtweet => {
            res.status(201).send("newtweet");
          })
          .catch(err =>{
            //console.log
            res.status(403).send({message: err});
          }); 
        }
      });         
       });
    }
  });
};

exports.show=  (req,res)=>{
  tweet.findOne({_id: req.params.id})
  .then(requiredTweet => {
    res.send(requiredTweet);
  })
  .catch(err => {
    res.status(404).send({message:err});
  })
   ////https://stackoverflow.com/questions/67680295/node-js-mongoose-findone-id-req-params-id-doesnt-work
  //// https://stackoverflow.com/questions/20044743/twitter-api-get-tweet-id
};

exports.lookup= (req,res)=>{
};


exports.favorite= async(req,res) =>{
  var tweetId = req.params.id;
  var userId = req.userId;
  //var isLiked = req.User.favorites && req.User.favorites.includes(tweetId);
  //User.findById(userId,{"favorites":{"$exists":true}})
  user.findById(userId).exec(async (err,userData)=>{
    if(err){
      res.status(400).send({message: err});
    }
    if(!userData.favorites.includes(tweetId)){
      await User.findByIdAndUpdate(userId,{$push:{favorites: tweetId}},{new: true}).exec(async (err,userfavorites)=>{
        if(userfavorites){
          //res.status(200).send("success! liked"); 
          tweet.findById(tweetId).exec(async (err,tweetdata)=>{
            if(err){
              res.status(400).send({message: err});
            }
            if(!tweetdata.favorites.includes(userId)){
              await Tweet.findByIdAndUpdate(tweetId,{$push:{favorites: userId}},{new: true})
              res.status(200).send({message:tweetdata.favorites.length+1});
            }
          })
        }
      })      
    }
    else{
      console.log('tweet already liked')
    }
  })


};

exports.unfavorite= (req,res) =>{
  var tweetId = req.params.id;
  var userId = req.userId;

  user.findById(userId).exec(async(error,data)=>{
    if(error){
      res.status(400).send({message: err});
    }

    if(data.favorites.includes(tweetId)){
      await User.findByIdAndUpdate(userId,{$pull:{favorites: tweetId}},{new: true}).exec(async (err,userfavorites)=>{
        if(userfavorites){
          tweet.findById(tweetId).exec(async (err,tweetdata)=>{
            if(err){
              res.status(400).send({message: err});
            }
            if(tweetdata.favorites.includes(userId)){
              console.log(tweetdata.favorites.length)
              await Tweet.findByIdAndUpdate(tweetId,{$pull:{favorites: userId}},{new: true})
              res.status(200).send({message:tweetdata.favorites.length-1});
              console.log(tweetdata.favorites)
            }
          })

        }
      })
    }
    // else{
    //   console.log('tweet already unliked')
    // }
  })

};



// exports.destroyTweet= (req,res)=>{
//   Tweet.findByIdAndDelete(req.params.id)
//   .then(deletedTweet =>{
//     res.send(deletedTweet);
//   })
//   .catch(err=>{
//     res.send({message:err})
//   })
//   //////////////
// //   .exec(async (err,deletedTweet)=>{ 
// //     console.log(deletedTweet) 
// //   if(err){
// //     res.status(400).send({message:err});
// //   }
// //   if(!deletedTweet){
// //     res.status(403).send({message:"tweet id doesn't exist"});
// //   }
// //   if(deletedTweet){
// //     res.status(200).send({message:"success! tweet deleted"});
// //   }
// // })
// };