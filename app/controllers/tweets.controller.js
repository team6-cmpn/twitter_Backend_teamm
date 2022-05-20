
require("dotenv").config();
const config = require("../config/pusher.config");
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
  appId : config.appId,
  key : config.key,
  secret : config.secret,
  cluster : config.cluster,
  useTLS: config.useTLS,
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
  Tweet.findOne({text:req.body.text,user:req.userId}).exec(async (err,tweetText)=>{
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
        User.findOne({username:req.body.mention}).exec(async (err,mentioneduser)=>{
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




///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                           send notification to followers when tweeting                   //



        followers=await getListRelationsIDs(activeUser._id,"followers")
        //console.log(followers)
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
  res.status(404).send({message:"tweet not found"})
}
else{
//get required tweet object(contain tweet and the user created it)
  requiredTweet = await getTweet(tweetId,tweet.user);
  if(requiredTweet){
    if(requiredTweet[0].favorites.includes(req.userId)){
      var isLiked = true;
    }else{
      var isLiked = false;
    }
    if(requiredTweet[0].retweetUsers.includes(req.userId)){
      var isRetweetd = true;
    }else{
      var isRetweetd = false;
    }
    res.status(200).send({"isLiked":isLiked,"isRetweeted":isRetweetd,"tweet":requiredTweet[0],"user":requiredTweet[1]})
  }else{
    res.status(400).send({message:"couldn't find tweetobject"})
  }
}
}
   ////https://stackoverflow.com/questions/67680295/node-js-mongoose-findone-id-req-params-id-doesnt-work
  //// https://stackoverflow.com/questions/20044743/twitter-api-get-tweet-id
  exports.lookup= async(req,res)=>{
    //to convert string to numbers
    page = parseInt(req.params.page);
    tweetsCount = parseInt(req.params.tweetsCount);
    var tweetsArrayFollowings = [];
    var tweetsArrayRandom = [];
    
    //get users list followed by authenticated user 
    var usersIdList = await getListRelationsIDs(req.userId,"following")

    if(!usersIdList){
      res.status(500).send({message:"following list error"})
    }

    //find tweets array of those users and sort them to the most recent tweets
    if (usersIdList != "user not found" ){
      var count = await Tweet.countDocuments({ user:{$in: usersIdList} });

      if (count > tweetsCount*(page-1) ){
        var followingsTweets = await Tweet.find({user:{$in: usersIdList}}) //////////
        .sort({created_at:-1})
        .skip(tweetsCount*(page-1))
        .limit(tweetsCount)

        if(followingsTweets){
    
          for(let i = 0; i< followingsTweets.length;i++){
            var tweetelement = followingsTweets[i];
            var tweet = await getTweet(tweetelement._id,tweetelement.user)
            tweetsArrayFollowings.push({"tweet":tweet[0],"user":tweet[1]});
          }
         
        }else{
          res.send({message:"couldn't find tweets in database"})
        }  
      }
    }
    //var currentDate = new Date()
    //var lastWeekDate = currentDate.setDate(currentDate.getDate()-7)
    //var newsfeedTweets = await Tweet.aggregate([{$match:{created_at:{$gte: new Date(lastWeekDate),$lte: new Date()}}}]).sort({created_at:-1}).skip(tweetsCount*(page-1)).limit(tweetsCount)

    var skipvalue = 0;
    if ((tweetsCount*(page-1)-count) >0){ skipvalue = tweetsCount*(page-1)-count}
    var newsfeedTweets = await Tweet.aggregate().sort({created_at:-1}).skip(skipvalue).limit(tweetsCount-tweetsArrayFollowings.length)

    if(newsfeedTweets){
      for(let i = 0; i< newsfeedTweets.length;i++){
        var tweetelement = newsfeedTweets[i];
        var tweet = await getTweet(tweetelement._id,tweetelement.user)
        tweetsArrayRandom.push({"tweet":tweet[0],"user":tweet[1]});
      }
    }else{
      res.status(404).send({message:"couldn't find tweets in database"})
    }
    
    if (tweetsArrayRandom && tweetsArrayFollowings){
      res.status(200).send(tweetsArrayFollowings.concat(tweetsArrayRandom))
    }else{
      res.send({message:"tweets array error"})
    }
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
            numberOfUsersHandling=tweetfavorites.favorite_count>2  ?   String(userData.name)+ " and "+String(tweetfavorites.favorite_count-1)+ " others" : String(nameArrayHandle[1])+ " and "+String(nameArrayHandle[0])

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
            await User.findByIdAndUpdate(userId,{$push:{retweets: retweet._id}},{new: true}).exec(async (err,userRetweets)=>{
              if(err){
                res.status(400).send({message: err});
              }
              if(userRetweets){
                Tweet.findById(tweetId).exec(async (err,tweetdata)=>{
                  if(err){
                    res.status(400).send({message: err});
                  }
                //insert tweet retweets
                if(!tweetdata.retweetUsers.includes(userId)){
                  await Tweet.findByIdAndUpdate(tweetId,{$push:{retweetUsers: userId}},{new: true}).exec(async(err,retweetedTweet)=>{
                    retweetedTweet.retweet_count = tweetdata.retweetUsers.length+1;
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
        res.send({message:"tweet already retweeted"})
      }
  });
};

exports.unretweet= async(req,res)=>{
  var tweetId = req.params.id;
  var userId = req.userId;

  var tweetcheck = await Tweet.findById(tweetId);
  if(tweetcheck){
    User.findById(userId).exec(async (err,userData)=>{
      if(err){
        res.status(400).send({message: err});
      }
      if (userData){
        if(userData.retweets.includes(tweetId)){
          Tweet.findOne({_id: req.params.id}).exec(async (err,requiredTweet)=>{
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
        }else{
          res.send({message:"tweet already unretweeted"})
        }
      }
    });
  }else{
    res.status(400).send({message: "tweet not found"});

  }
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
            // if(!deletedTweet){
            //   res.status(403).send({message:"tweet id doesn't exist"});
            // }
            if(deletedTweet){
              res.status(200).send({message:"success! tweet deleted"});
            }
          })
      }else{
        res.send({message:"can't delete another user tweet"})
      }
    }else{
      res.status(403).send({message:"tweet id doesn't exist"});
    }

  })
};


exports.retweeters= async(req,res)=>{
  var tweetId = req.params.id;
  var requiredTweet = await Tweet.findById(tweetId)
    if(requiredTweet){
      var retweeters = requiredTweet.retweetUsers;
      var retweetUsers = await getUsersFromArray(retweeters);
      res.status(200).send({"retweetersList":retweetUsers})
    }
    if(!requiredTweet){
      res.status(404).send({message:"tweet not found in database"})
    }
};

exports.favoriteList= async(req,res)=>{
  var tweetId = req.params.id;
  var requiredTweet = await Tweet.findById(tweetId)
    if(requiredTweet){
      var likers = requiredTweet.favorites;
      var favoriteUsers = await getUsersFromArray(likers);
      res.status(200).send({"favoriteusers":favoriteUsers})
    }
    if(!requiredTweet){
      res.status(404).send({message:"tweet not found in database"})
    }
};
