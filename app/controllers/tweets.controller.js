
require("dotenv").config();
const config = require("../config/auth.config");
const db = require("../models");
const Tweet = db.tweet;
const User = db.user;
var {TokenExpiredError}  = require("jsonwebtoken");
var jwt  = require("jsonwebtoken");
const { tweet, user } = require("../models");
const { findOneAndDelete, findByIdAndUpdate } = require("../models/user.model");
//const { post } = require("../../app");



exports.update=  async(req,res)=>{
  // to create tweet
  const tweet = new Tweet({
  created_at: new Date(),
  text: req.body.text,
  user: req.userId,
  source: req.body.source,
  mention: req.body.mention
});

if(req.body.text)
{
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
}else{
  res.status(403).send({message: "forbidden! no text entered in the tweet"})
}

};

exports.show=  (req,res)=>{
  var userId = req.userId;
  console.log(userId)
  tweet.findOne({_id: req.params.id}).exec(async (err,requiredTweet)=>{
    if(requiredTweet){
      
      User.findById(userId).exec(async (err,userData)=>{
        if(err){
          res.status(400).send({message: err});
        }
        else{
          console.log(userData)
          var userName = userData.username;
          console.log(userName)
          tweet.findByIdAndUpdate(req.params.id,{username: userName},{new: true})
          res.status(200).send(requiredTweet)
        }
      });
    }else{
      res.status(404).send({message:"tweet doesn't exist"});
    }


    // tweet.findOne({_id: req.params.id}).exec(async (err,requiredTweet)=>{
    //   if(requiredTweet){
    //     res.status(200).send(requiredTweet)
    //     //res.send(requiredTweet);
    //   }else{
    //     res.status(404).send({message:"tweet doesn't exist"});
    //   }

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
      res.send({message:"tweet already liked"})
      //console.log('tweet already liked')
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
