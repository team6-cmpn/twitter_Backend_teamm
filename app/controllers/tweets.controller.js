
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
const {getListRelationsIDs,getUsersFromArray} = require("../utils/user.js");
const {getTweet} = require("../utils/tweet.js");


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
  mention: req.body.mention,
  imageUrl: req.body.imageUrl
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
      //to check if there is image or not
      if(req.body.imageUrl){
        tweet.hasImage = true;
      }else{
        tweet.hasImage = false;
      }
      //get user object to show it
      User.findById(req.userId).exec(async (err,userData)=>{
        if(err){
          res.status(404).send({message:err})
        }
        if(userData){
          tweet.user = userData;
        } 
      })
      //check if there is mention and return mentioned user id
      if(req.body.mention){
        console.log(req.body.mention)
        User.findOne({username:req.body.mention}).exec(async (err,mentioneduser)=>{
          //console.log(mentioneduser)
          if(err){
            res.send({message:err})
          }
          if(mentioneduser){
            tweet.mentionedUser = mentioneduser._id;
          }
        })
      }
      //save tweet in database
      tweet.save()
      .then(newtweet => {
        User.findById(req.userId, async function (err, activeUser) {
          console.log(req.userId)
          console.log("user")



///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                           send notification to followers when tweeting                   //



        followers=await getListRelationsIDs(activeUser._id,"followers")
        console.log(followers)
        if(followers.length>0){
          notification= new Notification({
            notificationType: 'tweet',
            notificationHeader:{
              text: " In case you missed "+ String(activeUser.name) +"  has tweeted",
              images: activeUser.profile_image_url
            },
            notificationContent: newtweet,
            userRecivedNotification: followers,
            created_at: new Date()

          })
          notification.save()
        await pusher.trigger(String(followers), 'tweet-event',notification);
        }

//                                                                                                          //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

exports.show=  async(req,res)=>{
  //var userId = req.userId;
  var tweetId = req.params.id;
  var tweet = await Tweet.findById(tweetId);
  if(!tweet){
    res.status(404).send("tweet not found")
  }
  else{
  //get required tweet object(contain tweet and the user created it)
    requiredTweet = await getTweet(tweetId,tweet.user);
    res.status(200).send({"tweet":requiredTweet[0],"user":requiredTweet[1]})
  }
  }
   ////https://stackoverflow.com/questions/67680295/node-js-mongoose-findone-id-req-params-id-doesnt-work
  //// https://stackoverflow.com/questions/20044743/twitter-api-get-tweet-id

exports.lookup= async(req,res)=>{
  //to convert string to numbers
  page = parseInt(req.params.page);
  tweetsCount = parseInt(req.params.tweetsCount);

  //get users list followed by authenticated user 
  var usersIdList = await getListRelationsIDs(req.userId,"following")

  //find tweets array of those users and sort them to the most recent tweets
  var followingsTweets = await Tweet.find({user:{$in: usersIdList}})
  .sort({created_at:-1})
  .skip(tweetsCount*(page-1))
  .limit(tweetsCount)

  var tweetsArray = [];

  for(let i = 0; i< followingsTweets.length;i++){
    var tweetelement = followingsTweets[i];
    var tweet = await getTweet(tweetelement.id,tweetelement.user)
    tweetsArray.push(tweet);
  }

  res.status(200).send(tweetsArray)
};

// /**
//  *
//  * @param {path param} req
//  * @param {*} res
//  */
exports.favorite= async(req,res) =>{
  var tweetId = req.params.id;
  var userId = req.userId;

  //get user and check if he liked this tweet before
  user.findById(userId).exec(async (err,userData)=>{
    if(err){
      res.status(400).send({message: err});
    }
    if(!userData.favorites.includes(tweetId)){
      //insert user's like
      await User.findByIdAndUpdate(userId,{$push:{favorites: tweetId}},{new: true}).exec(async (err,userfavorites)=>{
        if(userfavorites){
          tweet.findById(tweetId).exec(async (err,tweetdata)=>{
            if(err){
              res.status(400).send({message: err});
            }
            //insert tweet likes and return the count 
            if(!tweetdata.favorites.includes(userId)){

              await Tweet.findByIdAndUpdate(tweetId,{$push:{favorites: userId}},{new: true}).exec(async (err,tweetfavorites)=>{
                if(tweetfavorites){
              tweetfavorites.favorite_count = tweetfavorites.favorites.length;
            }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                    Message handling                                               //

            let favouriteListQuery=await Tweet.find({_id:tweetId}).populate('favorites').select('favorites -_id')
            let imageArray = favouriteListQuery[0].favorites.map(({   profile_image_url }) =>   profile_image_url)
            let imageUrlList= imageArray.slice(Math.max(imageArray.length - 3, 0))
            let nameListQuery=await Tweet.find({_id:tweetId}).populate('favorites').select('favorites -_id')
            let nameArray = nameListQuery[0].favorites.map(({ name }) => name)
            let nameArrayHandle= nameArray.slice(0,2)
            numberOfUsersHandling=tweetfavorites.favorite_count>2  ?   String(userData.name)+ " and "+String(tweetfavorites.favorite_count-1)+ " others" : String(nameArrayHandle[1])+ " and"+String(nameArrayHandle[0])

//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

             User.findById(  tweetfavorites.user, async function (err, userRecivingNotification) {
              if(userRecivingNotification._id != req.userId){

                notification= new Notification({
                  notificationType: 'favourite',
                  notificationHeader: {
                    images:imageUrlList,
                    text: ` ${ tweetfavorites.favorite_count==1? String(userData.name) +" liked your tweet" :   numberOfUsersHandling +" liked your tweet"}`
                  },
                  notificationContent: tweetfavorites,
                  userRecivedNotification: userRecivingNotification,
                  created_at: new Date()
                })
                notification.save()
await User.findByIdAndUpdate(userRecivingNotification._id, {$addToSet:{notifications: notification }},{ returnDocument: 'after' })
                .exec(async(err,usernotific)=>{
                  if(err){
                    res.status(500).send({ message: err });
                    return;
                  }
                  if (usernotific){
                     await pusher.trigger(String(usernotific._id), 'favourite-event',notification);
                }})
              }

            })
              res.status(200).send({"favorite_count":tweetfavorites.favorite_count});
})}})}})}

    else{
      res.send({message:"tweet already liked"})
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
              await Tweet.findByIdAndUpdate(tweetId,{$pull:{favorites: userId}},{new: true})
              tweetdata.favorite_count = tweetdata.favorites.length-1
              res.status(200).send({"favorite_count":tweetdata.favorite_count});
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
        tweet.findOne({_id: req.params.id}).exec(async (err,requiredTweet)=>{
          if (err){
            res.status(400).send({message: err});
          }
          if(requiredTweet){
            var retweet = await Tweet.create(requiredTweet)
            await User.findByIdAndUpdate(userId,{$pull:{retweets: retweet._id}},{new: true}).exec(async (err,userRetweets)=>{
              if(err){
                res.status(400).send({message: err});
              }
              if(userRetweets){
                Tweet.findById(tweetId).exec(async (err,tweetdata)=>{
                  if(err){
                    res.status(400).send({message: err});
                  }
                if(tweetdata.retweetUsers.includes(userId)){
                  await Tweet.findByIdAndUpdate(tweetId,{$pull:{retweetUsers: userId}},{new: true}).exec(async(err,retweetedTweet)=>{
                    retweetedTweet.retweet_count = tweetdata.retweetUsers.length-1;
                    res.status(200).send(retweetedTweet)
                  });
                }
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
  Tweet.findById(tweetId).exec(async(err,requestedTweet)=>{
    if(err){
      res.status(400).send({message:err});
    }
    if (requestedTweet){
      if(requestedTweet.user==userId){
        Tweet.deleteOne({_id:tweetId}).exec(async(err,deletedTweet)=>{
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
      }else{
        res.send({message:"can't delete another user tweet"})
      }
    }

  })
};


exports.retweeters= async(req,res)=>{
  var tweetId = req.params.id;
  var userId = req.userId;
  Tweet.findById(tweetId).exec(async(err,requiredTweet)=>{
    if(err){
      res.status(404).send({message:err});
    }
    if(requiredTweet){
      var retweeters = requiredTweet.retweetUsers;
      var retweetUsers = await getUsersFromArray(retweeters);
      res.status(200).send({"retweetersList":retweetUsers})
    }
  })
};

exports.favoriteList= async(req,res)=>{
  var tweetId = req.params.id;
  var userId = req.userId;
  Tweet.findById(tweetId).exec(async(err,requiredTweet)=>{
    if(err){
      res.status(404).send({message:err});
    }
    if(requiredTweet){
      var likers = requiredTweet.favorites;
      var favoriteUsers = await getUsersFromArray(likers);
      res.status(200).send({"favoriteusers":favoriteUsers})
    }
  })
};
