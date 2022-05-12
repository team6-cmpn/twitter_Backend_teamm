
require("dotenv").config();
const config = require("../config/auth.config");
const db = require("../models");
const Tweet = db.tweet;
const User = db.user;
const Notification = db.notification;
const Pusher = require('pusher');
var {TokenExpiredError}  = require("jsonwebtoken");
var jwt  = require("jsonwebtoken");
const { tweet, user } = require("../models");
const { findOneAndDelete, findByIdAndUpdate } = require("../models/user.model");
//const { post } = require("../../app");



const pusher = new Pusher({
appId : "1406245",
key : "a02c7f30c561968a632d",
secret : "5908937248eea3363b9e",
cluster : "eu",
useTLS: true,
    });





/**
 *
 * @module tweets
 */

/**
 *
 * @global
 * @typedef {object} requestTweetBody
 * @property {Date} created_at date generated
 * @property {string} text text in request body
 * @property {string} source source in request body
 * @property {string} mention mention in request body
 * @property {string|number} user user got
 *
 */

/**
 *
 * @global
 * @typedef {object} responsetweetbody
 * @property {Date} created_at date generated
 * @property {string} text text in request body
 * @property {string} source source in request body
 * @property {string} mention mention in request body
 * @property {string|number} user user got
 * @property {string|number} _id
 */

/**
 *
 * @param {requestTweetBody} req
 * @param {responsetweetbody} res
 */

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
        User.findById(req.userId, async function (err, activeUser) {


console.log(activeUser.followers[0])
console.log(activeUser._id)

          notification= new Notification({
            notificationType: 'tweet',
            notificationHeader: " In case you missed "+ String(activeUser.name) +"  has tweeted" ,
            notificationContent: newtweet,
            user: activeUser.followers
          })
          notification.save()

//var channel= activeUser.followers.map(function(ids){return String(ids)})
 /*
channels=[]
  for (let id of activeUser.followers){
    channels.push(String(id))
  }
  console.log(channels)
  */
        await pusher.trigger(String(activeUser.followers), 'tweet-event',{header:notification.notificationHeader, content: notification.notificationContent});


        })
        res.status(201).send(newtweet);

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

/**
 *
 * @global
 * @typedef {object} responsereturntweet
 * @property {Date} created_at date generated
 * @property {string} text text in request body
 * @property {string} source source in request body
 * @property {string} mention mention in request body
 * @property {string|number} user user got
 * @property {string|number} _id
 */
/**
 *
 * @param {responsereturntweet} res
 */

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

// /**
//  *
//  * @param {path param} req
//  * @param {*} res
//  */
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
      //insert user's like
      await User.findByIdAndUpdate(userId,{$push:{favorites: tweetId}},{new: true}).exec(async (err,userfavorites)=>{
        if(userfavorites){
          //res.status(200).send("success! liked");
          tweet.findById(tweetId).exec(async (err,tweetdata)=>{
            if(err){
              res.status(400).send({message: err});
            }
            //insert tweet likes 
            if(!tweetdata.favorites.includes(userId)){

              await Tweet.findByIdAndUpdate(tweetId,{$push:{favorites: userId}},{new: true})
              tweetdata.favorite_count = tweetdata.favorites.length+1;
              /////////////////////////////////////////////////
            //  userRecivingNotification = User.findById(tweetdata.user)
            //  console.log(userRecivingNotification)
            User.findById(tweetdata.user, async function (err, userRecivingNotification) {
              console.log(tweetdata)
              console.log(userRecivingNotification.username)
              console.log(userData.name)

              notification= new Notification({
                notificationType: 'favourite',
                notificationHeader:  String(userData.name) +" liked your tweet",
                notificationContent: tweetdata,
                user: userRecivingNotification
              })
              notification.save()

        await pusher.trigger(String(userRecivingNotification._id), 'favourite-event',{header:notification.notificationHeader, content: notification.notificationContent});

            })


              ///////////////////////////////////////////////////

              console.log(tweetdata.favorites)
              //var count = tweetdata.favorite_count;
              res.status(200).send({"favorite_count":tweetdata.favorite_count});
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

exports.unfavorite= async(req,res) =>{
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
              //console.log(tweetdata.favorites.length)
              await Tweet.findByIdAndUpdate(tweetId,{$pull:{favorites: userId}},{new: true})
              tweetdata.favorite_count = tweetdata.favorites.length-1
              res.status(200).send({"favorite_count":tweetdata.favorite_count});
              //console.log(tweetdata.favorites)
            }
          })

        }
      })
    }
    else{
      res.send({message:"tweet already unliked"})
    }
  })

};

exports.retweet= async(req,res)=>{
  var tweetId = req.params.id;
  var userId = req.userId;

  user.findById(userId).exec(async (err,userData)=>{
    if(err){
      res.status(400).send({message: err});
    }
    if(!userData.retweets.includes(tweetId)){
        // await Tweet.create({user: userId, retweetData: tweetId}).exec(async(err,retweet)=>{
        //   if (err){
        //     
        //   }res.status(400).send({message: err});
        tweet.findOne({_id: req.params.id}).exec(async (err,requiredTweet)=>{
          if (err){
            res.status(400).send({message: err});
          }
          if(requiredTweet){
            var retweet = await Tweet.create(requiredTweet)
            console.log(retweet)
            // .catch(err =>{
            //   res.status(400).send({message: err})
            // })
            //insert usrs retweets
            await User.findByIdAndUpdate(userId,{$push:{retweets: retweet._id}},{new: true}).exec(async (err,userRetweets)=>{
              if(err){
                res.status(400).send({message: err});
              }
              if(userRetweets){
                Tweet.findById(tweetId).exec(async (err,tweetdata)=>{
                  if(err){
                    res.status(400).send({message: err});
                  }
                //console.log(tweetdata)
                //insert tweet retweets  
                if(!tweetdata.retweetUsers.includes(userId)){
                  await Tweet.findByIdAndUpdate(tweetId,{$push:{retweetUsers: userId}},{new: true}).exec(async(err,retweetedTweet)=>{
                    //console.log(retweetedTweet)
                    retweetedTweet.retweet_count = tweetdata.retweetUsers.length+1;
                    //console.log(tweetdata.retweet_count)
                    res.status(200).send(retweetedTweet)  
                  });

                } 
                //res.status(200).send(tweetdata)
                })

              }
            });
          }
        });
      }
      else{
        res.send({message:"tweet already retweeted"})
      }
  });
};

exports.unretweet= async(req,res)=>{
  var tweetId = req.params.id;
  var userId = req.userId;

  user.findById(userId).exec(async (err,userData)=>{
    if(err){
      res.status(400).send({message: err});
    }
    if(userData.retweets.includes(tweetId)){
        // await Tweet.create({user: userId, retweetData: tweetId}).exec(async(err,retweet)=>{
        //   if (err){
        //     
        //   }res.status(400).send({message: err});
        tweet.findOne({_id: req.params.id}).exec(async (err,requiredTweet)=>{
          if (err){
            res.status(400).send({message: err});
          }
          if(requiredTweet){
            var retweet = await Tweet.create(requiredTweet)
            //console.log(retweet)
            // .catch(err =>{
            //   res.status(400).send({message: err})
            // })
            //insert usrs retweets
            await User.findByIdAndUpdate(userId,{$pull:{retweets: retweet._id}},{new: true}).exec(async (err,userRetweets)=>{
              if(err){
                res.status(400).send({message: err});
              }
              if(userRetweets){
                Tweet.findById(tweetId).exec(async (err,tweetdata)=>{
                  if(err){
                    res.status(400).send({message: err});
                  }
                //console.log(tweetdata)
                //insert tweet retweets  
                if(tweetdata.retweetUsers.includes(userId)){
                  await Tweet.findByIdAndUpdate(tweetId,{$pull:{retweetUsers: userId}},{new: true}).exec(async(err,retweetedTweet)=>{
                    //console.log(retweetedTweet)
                    retweetedTweet.retweet_count = tweetdata.retweetUsers.length-1;
                    //console.log(tweetdata.retweet_count)
                    res.status(200).send(retweetedTweet)  
                  });

                } 
                //res.status(200).send(tweetdata)
                })

              }
            });
          }
        });
        
      }
      else{
        res.send({message:"tweet already unretweeted"})
      }
  });
};


exports.destroyTweet= async(req,res) =>{
  var tweetId = req.params.id;
  var userId = req.userId;
  var deleted = Tweet.findByIdAndDelete(tweetId).exec(async(err,deletedTweet)=>{
    if(err){
      res.status(400).send({message:err});
    }
    if(!deletedTweet){
      res.status(403).send({message:"tweet id doesn't exist"});
    }
    if(deletedTweet){
      res.status(200).send({message:"success! tweet deleted"});
    }
  })
  //console.log(deleted)
};
