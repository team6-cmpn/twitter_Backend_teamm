
const config = require("../config/auth.config");
const sendEmail = require("../utils/email");
const db = require("../models");
const Tweet= db.tweet;
const User = db.user;
const Notification = db.notification;
const Pusher = require('pusher');
var {TokenExpiredError}  = require("jsonwebtoken");
var jwt  = require("jsonwebtoken");















  /**
   *
   * @module admin
   */

  /**
   *
   * @global
   * @typedef {object}  requestBodyAdminCreateBlock
   * @property {Number} duration the duration in days the admin identify to block a user
   * @property {string} userid the id of the user need to be blocked
   *
   */

  /**
   *
   * @global
   * @typedef {object}  responseBodyAdminCreateBlock
   * @property {object}  blockedUserConfirmed  user object represent the users who was blocked by admin
   */

   /**
    * This function that admin use to block users for a certain amount of time defined in a duration of number of days if the user isnt already blocked and not an admin
    *
    * @param {requestBodyAdminCreateBlock} req the request sent from the front
    * @param {responseBodyAdminCreateBlock} res the response which is sent back to the front
    *
    */







exports.createBlock= async(req,res)=>{


  let objId= req.query.userid
  let duration=req.body.duration

const pusher = new Pusher({
appId : "1406245",
key : "a02c7f30c561968a632d",
secret : "5908937248eea3363b9e",
cluster : "eu",
useTLS: true,
    });




   await User.findById(objId).exec( async (err, blockedUser) => {
     if (err) {
       res.status(500).send({ message: err });
       return;
     }
     if(!blockedUser){
       res.status(404).send({message: " normal user not found"})
     }
if(blockedUser){
  if (blockedUser.isAdmin==true){
      res.status(403).send({message: " You can't block an admin  "})

}

if(!duration){
    res.status(422).send({message: " You must enter a block duration in days  "})
  }


if (blockedUser.isAdmin==false && blockedUser.admin_block.blocked_by_admin== false && duration ){
await User.findByIdAndUpdate(objId,{ admin_block:{ blocked_by_admin: true,block_createdAt:new Date().getTime(),block_duration: duration }},{ returnDocument: 'after' }).exec(async(err,blockedUserConfirmed)=>{

if (err) {
  res.status(500).send({ message: err });
  return;
}
////

res.status(200).send(blockedUserConfirmed)

});
}

}});
}



  /**
   *
   * @global
   * @typedef {object} requestBodyShowUsers
   *
   */

 /**
  *
  * @global
  * @typedef {object} responseBodyShowUsers
  * @property {Array.<Object>} foundUsers array of objects representing the users who are not admins
  */
 /**
  * This function show all the users who are not admins to the admins
  *
  * @param {requestBodyShowUsers} req the request sent from the front
  * @param {responseBodyShowUsers} res the response which is sent back to the front
  *
  */




exports.showUsers = async (req, res) => {

  await User.find({isAdmin: false}).exec((err,foundUsers)=>{
    if (err){
      res.status(500).send({ message: err})
      return;
    }
    else{
        res.status(200).send(foundUsers)
    }
  });
};








  /**
   * @global
   * @typedef {object} requestBodyGetStatistics
   */

 /**
  * @global
  * @typedef {object} responseBodyGetStatistics
  * @property {Array.<Object>} staatic array of objects represent the statistics calculated
  */
 /**
  * This function calculate various type of statistics and return an array of objects of the calculated statistics
  *
  * @param {requestBodyGetStatistics} req the request sent from the front
  * @param {responseBodyGetStatistics} res the response which is sent back to the front
  *
  */


exports.getStatistics=  (req,res)=>{
  var staatic=[]
  let allUsersCount = new Object()
  let topFollowers = new Object()
  let  allTweetsCount= new Object()
  let  usersPerMonth= new Object()
  let  usersPerYear= new Object()
  let topFiveLikedTweets= new Object()
  let topFiveRetweetedTweets= new Object()
  let newUsersLastWeek= new Object()
  let usersAges= new Object()
  let  tweetsPerMonth= new Object()
  let  tweetsPerYear= new Object()
  let  tweetsPerDay= new Object()
  let  usersPerDay= new Object()

// users per week
let  currentDate= new Date()
let  lastWeekDate= currentDate.setDate(currentDate.getDate()-7)
// tweet user per day
let currentDate2= new Date()
let beginOfDay= currentDate2.setHours(0,0,0,0)


 Promise.all([

User.find({isAdmin:false}).sort({followers_count:-1}).limit(5).select("username followers_count -_id "),
Tweet.countDocuments(),
User.countDocuments({isAdmin:false}),

User.aggregate([{$match: {isAdmin:false}},{'$project': {'month': {'$month': '$created_at'  },   'year': {    '$year': '$created_at'  }  }},{
    '$group': {
      '_id': {
        'month': '$month',
        'year': '$year'
      },
      'total': {
        '$sum': 1
      }}}]),

User.aggregate([{$match: {isAdmin:false}},{$group: {_id: {$year: "$created_at"},totalUsers: {$sum: 1}}}]),
Tweet.find({}).sort({favorite_count:-1}).limit(5),
Tweet.find({}).sort({retweet_count:-1}).limit(5),

User.aggregate([{$match: {created_at: {$gte: new Date(lastWeekDate),$lte: new Date()},isAdmin:false}},{$group: { _id: {
      "year":  { "$year": "$created_at" },
      "month": { "$month": "$created_at" },
      "day":   { "$dayOfMonth": "$created_at" }
    },
    count:{$sum: 1}
  }
}]),

User.aggregate([{$match: {isAdmin:false}},{"$project": {"age": {"$divide": [{"$subtract": [new Date(),{ "$ifNull": ["$dateOfBirth", new Date()] }]},1000 * 86400 * 365]}}},
{"$group": {"_id": {"$concat":[
                      { "$cond": [ { "$lte": [ "$age", 0 ] }, "Unknown (dateofbirth not entered or age is below 13 (cant have an account) )", ""] },
                      { "$cond": [ { "$and": [ { "$gt":  ["$age", 13 ] }, { "$lt": ["$age", 18] } ]}, "13 - 18", ""] },
                      { "$cond": [ { "$and": [ { "$gte": ["$age", 18] }, { "$lt": ["$age", 31] } ]}, "19 - 30", ""] },
                      { "$cond": [ { "$and": [ { "$gte": ["$age", 31] }, { "$lt": ["$age", 51] } ]}, "31 - 50", ""] },
                      { "$cond": [ { "$and": [ { "$gte": ["$age", 51] }, { "$lt": ["$age", 71] } ]}, "51 - 70", ""] },
                      { "$cond": [ { "$gte": [ "$age", 71 ] }, "Over 70", ""] }
                  ]},"persons": { "$sum": 1 }}},{ "$project": { "_id": 0, "age": "$_id", "persons": 1 } }]),




Tweet.aggregate([{'$project': {'month': {'$month': '$created_at'  },   'year': {    '$year': '$created_at'  }  }},{
    '$group': {
      '_id': {
        'month': '$month',
        'year': '$year'
      },
      'total': {
        '$sum': 1
      }}}]),



Tweet.aggregate([{$group: {_id: {$year: "$created_at"},totalTweets: {$sum: 1}}}]),


Tweet.aggregate([{$match: {created_at: {$gte: new Date(beginOfDay),$lte: new Date()}}},{$group: { _id: {
      "year":  { "$year": "$created_at" },
      "month": { "$month": "$created_at" },
      "day":   { "$dayOfMonth": "$created_at" }
    },
    count:{$sum: 1}
  }
}]),


User.aggregate([{$match: {created_at: {$gte: new Date(beginOfDay),$lte: new Date()},isAdmin:false }},{$group: { _id: {
      "year":  { "$year": "$created_at" },
      "month": { "$month": "$created_at" },
      "day":   { "$dayOfMonth": "$created_at" }
    },
    count:{$sum: 1}
  }
}]),


/////////////////////

// Add here
///////////////////



])
.then(results=>{


topFollowers.users_With_Most_Followers=results[0]
 staatic.push(topFollowers)

allTweetsCount.all_Tweets_Count=results[1]
 staatic.push(allTweetsCount)

allUsersCount.all_Users_Count_withoutAdmins=results[2]
  staatic.push(allUsersCount)

usersPerMonth.users_Per_Month=results[3]
  staatic.push(usersPerMonth)

usersPerYear.users_Per_Year=results[4]
   staatic.push(usersPerYear)

topFiveLikedTweets.top_Five_Liked_Tweets= results[5]
staatic.push(topFiveLikedTweets)

topFiveRetweetedTweets.top_Five_Retweeted_Tweets= results[6]
staatic.push(topFiveRetweetedTweets)

 newUsersLastWeek.new_Users_During_aWeek= results[7]
 staatic.push(newUsersLastWeek)

usersAges.users_Ages= results[8]
staatic.push(usersAges)

tweetsPerMonth.tweets_Per_Month= results[9]
staatic.push(tweetsPerMonth)

tweetsPerYear.tweets_Per_Year= results[10]
staatic.push(tweetsPerYear)

tweetsPerDay.tweets_Per_Day= results[11]
staatic.push(tweetsPerDay)

 usersPerDay.new_Users_Per_Day= results[12]
 staatic.push(usersPerDay)

res.status(200).send(staatic)

})
.catch(function(err){
  res.status(500).send({message: err.name+" "+err.message})
});
};
