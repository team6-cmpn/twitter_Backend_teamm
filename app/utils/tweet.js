const { relations } = require("../models");
const db = require("../models");
const User = db.user;
const Tweet = db.tweet;
const Relation = db.relations;
require("dotenv").config();

exports.getTweet = async(tweetId,userId) =>
{
  var requiredTweet =await Tweet.findById({_id: tweetId})
  console.log(requiredTweet)
  console.log("tweetaaaaaaaaa")
  var user = await User.findById(userId);
  tweetobject = [];
  console.log(user)
  console.log(user.username)
  tweetobject.push(requiredTweet,user)
  console.log(tweetobject)
  return tweetobject;

}