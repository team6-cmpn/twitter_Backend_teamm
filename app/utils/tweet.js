const { relations } = require("../models");
const db = require("../models");
const User = db.user;
const Tweet = db.tweet;
const Relation = db.relations;
require("dotenv").config();

exports.getTweet = async(tweetId,userId) =>
{
  var requiredTweet =await Tweet.findById({_id: tweetId})
  var user = await User.findById(userId);
  tweetobject = [];

  tweetobject.push(requiredTweet,user)

  return tweetobject;

}