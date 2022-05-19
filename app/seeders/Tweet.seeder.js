const db = require("../models");
const Tweet = db.tweet;
const { faker } = require('@faker-js/faker');
const { Seeder } = require('mongoose-data-seed');


const Tweetsdata=
[
  //////////////tweets created by olaaaa///////////////
  { 
    _id : "1282689f3072026523ba8c11", 
    created_at : "2022-05-20T15:07:11.540+0000", 
    text : "welcome to my tweet OLA", 
    user : "63668d2e864200cb48ca48d7", 
    favorites : [
        "99968d2e858900ca21ca48d7",
        "627adec1ceb4dc5e91fe221c",
        "627bc927592c6d120dcc126b",
        "62829a10d7a2423a544f527d",
    ], 
    mention : "@sameh", 
    retweetUsers : [
        "99968d2e858900ca21ca48d7",
        "627adec1ceb4dc5e91fe221c",
        "627bc927592c6d120dcc126b",
        "62829a10d7a2423a544f527d",
    ], 
    hasImage : false, 
  },
  {
    _id : "1282689f3072026523ba8c12", 
    created_at : "2022-05-20T15:05:11.540+0000", 
    text : "hello everyone, welcome to my second tweet OLA", 
    user : "63668d2e864200cb48ca48d7", 
    favorites : [
        "99968d2e858900ca21ca48d7",
        "627adec1ceb4dc5e91fe221c",
    ], 
    mention : "@menna", 
    retweetUsers : [
        "99968d2e858900ca21ca48d7",
        "627adec1ceb4dc5e91fe221c",
    ], 
    hasImage : false, 
  },
  {
    _id : "1282689f3072026523ba8c13", 
    created_at : "2022-05-21T15:05:11.540+0000", 
    text : "hello everyone, welcome to my third tweet OLA", 
    user : "63668d2e864200cb48ca48d7", 
    favorites : [
        "627bc927592c6d120dcc126b",
        "62829a10d7a2423a544f527d",
    ], 
    //mention : "admin2", 
    retweetUsers : [
<<<<<<< HEAD
        "627bc927592c6d120dcc126b",
        "62829a10d7a2423a544f527d"
=======
>>>>>>> 906fd009ed55ec491c96647bf6b369a5643ceecd
    ], 
    hasImage : false, 
  },
  {
    _id : "1282689f3072026523ba8c14", 
    created_at : "2022-05-22T15:05:11.540+0000", 
    text : "hello everyone, welcome to my fourth tweet OLA", 
    user : "63668d2e864200cb48ca48d7", 
    favorites : [
        "63668d2e858900cb48ca48d7",
    ], 
    //mention : "admin2", 
    retweetUsers : [
        "63668d2e858900cb48ca48d7",
    ], 
    hasImage : true,
    imageUrl :"image", 
  },
  {
    _id : "1282689f3072026523ba8c15", 
    created_at : "2022-05-24T15:05:11.540+0000", 
    text : "hello everyone, welcome to my fifth tweet OLA", 
    user : "63668d2e864200cb48ca48d7", 
    favorites : [
    ], 
    //mention : "admin2", 
    retweetUsers : [
    ], 
    hasImage : true,
    imageUrl :"image", 
  },
  {
    _id : "1282689f3072026523ba8c16", 
    created_at : "2022-05-24T15:08:11.540+0000", 
    text : "hello everyone, welcome to my 6 tweet OLA", 
    user : "63668d2e864200cb48ca48d7", 
    favorites : [
    ], 
    //mention : "admin2", 
    retweetUsers : [
    ], 
    hasImage : false,
  },

  //////////////tweets created by menna/////////
    {
    _id : "2282689f3072026523ba8c11", 
    created_at : "2022-05-20T15:08:11.540+0000", 
    text : "hello everyone, welcome to my tweet MENNA", 
    user : "99968d2e858900ca21ca48d7", 
    favorites : [
        "63668d2e864200cb48ca48d7", 
        "63668d2e858900cb48ca48d7",
        "627bc927592c6d120dcc126b",
        "627adec1ceb4dc5e91fe221c",
        "62829a10d7a2423a544f527d",
        "627f964d055a48cb594004c5",
    ], 
    //mention : "admin2", 
    retweetUsers : [
        "63668d2e864200cb48ca48d7",
        "63668d2e858900cb48ca48d7",
        "627bc927592c6d120dcc126b",
        "627adec1ceb4dc5e91fe221c",
        "62829a10d7a2423a544f527d",
        "627f964d055a48cb594004c5",
    ], 
    hasImage : false,
  },
  {
    _id : "2282689f3072026523ba8c12", 
    created_at : "2022-05-21T15:08:11.540+0000", 
    text : "hello everyone, welcome to my second tweet MENNA", 
    user : "99968d2e858900ca21ca48d7", 
    favorites : [
    ], 
    //mention : "admin2", 
    retweetUsers : [
    ], 
    hasImage : false,
  },
  {
    _id : "2282689f3072026523ba8c13", 
    created_at : "2022-05-22T15:08:11.540+0000", 
    text : "hello everyone, welcome to my third tweet MENNA", 
    user : "99968d2e858900ca21ca48d7", 
    favorites : [
    ], 
    mention : "@olaaa", 
    retweetUsers : [
    ], 
    hasImage : false,
  },
  {
    _id : "2282689f3072026523ba8c14", 
    created_at : "2022-05-24T15:08:11.540+0000", 
    text : "hello everyone, welcome to my fourth tweet MENNA", 
    user : "99968d2e858900ca21ca48d7", 
    favorites : [
    ], 
    //mention : "admin2", 
    retweetUsers : [
    ], 
    hasImage : false,
  },
////////////tweets created by mahmoud///////////////
  {
    _id : "3282689f3072026523ba8c11", 
    created_at : "2022-05-01T15:08:11.540+0000", 
    text : "hello, its me  MAHMOUD", 
    user : "627adec1ceb4dc5e91fe221c", 
    favorites : [
        "62829a10d7a2423a544f527d",
        "627bc927592c6d120dcc126b",
        "99968d2e858900ca21ca48d7",
    ], 
    //mention : "admin2", 
    retweetUsers : [
        "62829a10d7a2423a544f527d",
        "627bc927592c6d120dcc126b",
        "99968d2e858900ca21ca48d7"
    ], 
    hasImage : false,
  },
  {
    _id : "3282689f3072026523ba8c12", 
    created_at : "2022-05-11T15:05:11.540+0000", 
    text : "this is my second tweet MAHMOUD", 
    user : "627adec1ceb4dc5e91fe221c", 
    favorites : [
    ], 
    //mention : "admin2", 
    retweetUsers : [
    ], 
    hasImage : false,
  },
  {
    _id : "3282689f3072026523ba8c13", 
    created_at : "2022-05-20T15:08:11.540+0000", 
    text : "i am posting my third tweet MAHMOUD", 
    user : "627adec1ceb4dc5e91fe221c", 
    favorites : [
        "63668d2e858900cb48ca48d7",
    ], 
    mention : "@farah", 
    retweetUsers : [
        "63668d2e858900cb48ca48d7",
    ], 
    hasImage : false,
  },
  {
    _id : "3282689f3072026523ba8c14", 
    created_at : "2022-05-21T15:08:11.540+0000", 
    text : "i am posting my fourth tweet MAHMOUD", 
    user : "627adec1ceb4dc5e91fe221c", 
    favorites : [
    ], 
    mention : "@farah", 
    retweetUsers : [
    ], 
    hasImage : true,
    imageUrl: "image",
  },
  /////////////////// tweets created by farah osama //////////////
  {
    _id : "4282689f3072026523ba8c11", 
    created_at : "2022-05-11T15:08:11.540+0000", 
    text : "i am posting my tweet FARAH", 
    user : "627bc927592c6d120dcc126b", 
    favorites : [
        "63668d2e864200cb48ca48d7",
        "99968d2e858900ca21ca48d7",
    ], 
    //mention : "admin2", 
    retweetUsers : [
        "63668d2e864200cb48ca48d7",
    ], 
    hasImage : false,
  },
  {
    _id : "4282689f3072026523ba8c12", 
    created_at : "2022-05-12T15:08:11.540+0000", 
    text : "i am posting my second tweet FARAH", 
    user : "627bc927592c6d120dcc126b", 
    favorites : [
        "63668d2e864200cb48ca48d7",
    ], 
    //mention : "admin2", 
    retweetUsers : [
        "63668d2e864200cb48ca48d7",
    ], 
    hasImage : false,
  },
  {
    _id : "4282689f3072026523ba8c13", 
    created_at : "2022-05-14T15:08:11.540+0000", 
    text : "i am posting my third tweet FARAH", 
    user : "627bc927592c6d120dcc126b", 
    favorites : [
    ], 
    //mention : "admin2", 
    retweetUsers : [
    ], 
    hasImage : false,
  },
  {
    _id : "4282689f3072026523ba8c14", 
    created_at : "2022-05-21T15:08:11.540+0000", 
    text : "i am posting my fourth tweet FARAH", 
    user : "627bc927592c6d120dcc126b", 
    favorites : [
        "627adec1ceb4dc5e91fe221c",
    ], 
    //mention : "admin2", 
    retweetUsers : [
        "627adec1ceb4dc5e91fe221c",
    ], 
    hasImage : false,
  },
  {
    _id : "4282689f3072026523ba8c15", 
    created_at : "2022-05-22T15:08:11.540+0000", 
    text : "i am posting my fifth tweet FARAH", 
    user : "627bc927592c6d120dcc126b", 
    favorites : [
    ], 
    mention : "@farida", 
    retweetUsers : [
    ], 
    hasImage : false,
  },
  {
    _id : "4282689f3072026523ba8c16", 
    created_at : "2022-05-23T15:08:11.540+0000", 
    text : "i am posting my last tweet FARAH", 
    user : "627bc927592c6d120dcc126b", 
    favorites : [
        "63643d2e864200cb48ca49d7",
    ], 
    //mention : "admin2", 
    retweetUsers : [
        "63643d2e864200cb48ca49d7",
    ], 
    hasImage : false,
  },
  {
    _id : "4282689f3072026523ba8c17", 
    created_at : "2022-05-24T15:08:11.540+0000", 
    text : "i am posting my last last tweet FARAH", 
    user : "627bc927592c6d120dcc126b", 
    favorites : [
    ], 
    //mention : "admin2", 
    retweetUsers : [
    ], 
    hasImage : false,
  },
  ///////////////////tweets created by fathy /////////////////
  //627aec325464c5222def401b
  {
    _id : "5282689f3072026523ba8c11", 
    created_at : "2022-05-20T15:04:11.540+0000", 
    text : "welcome to my first tweet FATHY", 
<<<<<<< HEAD
    user : "62829a10d7a2423a544f527d", 
=======
    user : "627aec325464c5222def401b", 
>>>>>>> 906fd009ed55ec491c96647bf6b369a5643ceecd
    favorites : [
        "627f964d055a48cb594004c5",
    ], 
    //mention : "admin2", 
    retweetUsers : [
        "627f964d055a48cb594004c5",
    ], 
    hasImage : false,
  },
  {
    _id : "5282689f3072026523ba8c12", 
    created_at : "2022-05-21T15:04:11.540+0000", 
    text : "welcome to my second tweet FATHY", 
<<<<<<< HEAD
    user : "62829a10d7a2423a544f527d", 
=======
    user : "627aec325464c5222def401b", 
>>>>>>> 906fd009ed55ec491c96647bf6b369a5643ceecd
    favorites : [
        "63668d2e858900cb48ca48d7",
    ], 
    //mention : "admin2", 
    retweetUsers : [
        "63668d2e858900cb48ca48d7",
    ], 
    hasImage : false,
  },
  {
    _id : "5282689f3072026523ba8c13", 
    created_at : "2022-05-22T15:04:11.540+0000", 
    text : "welcome to my third tweet FATHY", 
<<<<<<< HEAD
    user : "62829a10d7a2423a544f527d", 
=======
    user : "627aec325464c5222def401b", 
>>>>>>> 906fd009ed55ec491c96647bf6b369a5643ceecd
    favorites : [
    ], 
    //mention : "admin2", 
    retweetUsers : [
    ], 
    hasImage : false,
  },
  {
    _id : "5282689f3072026523ba8c14", 
    created_at : "2022-05-20T15:04:11.540+0000", 
    text : "welcome to my fourth tweet FATHY", 
<<<<<<< HEAD
    user : "62829a10d7a2423a544f527d", 
=======
    user : "627aec325464c5222def401b", 
>>>>>>> 906fd009ed55ec491c96647bf6b369a5643ceecd
    favorites : [
    ], 
    //mention : "admin2", 
    retweetUsers : [
    ], 
    hasImage : false,
  },
 // 627f964d055a48cb594004c5
  ////////////////tweet created by farida//////////////
  {
    _id : "6282689f3072026523ba8c11", 
    created_at : "2022-05-20T15:04:11.540+0000", 
    text : "welcome to my first tweet Farida", 
    user : "627f964d055a48cb594004c5", 
    favorites : [
        "63668d2e864200cb48ca48d7"
    ], 
    //mention : "admin2", 
    retweetUsers : [
        "63668d2e864200cb48ca48d7"
    ], 
    hasImage : false,
  },
  {
    _id : "6282689f3072026523ba8c12", 
    created_at : "2022-05-21T15:04:11.540+0000", 
    text : "welcome to my second tweet Farida", 
    user : "627f964d055a48cb594004c5", 
    favorites : [
        "63643d2e864200cb48ca49d7",
    ], 
    //mention : "admin2", 
    retweetUsers : [
        "63643d2e864200cb48ca49d7",
    ], 
    hasImage : false,
  },
  {
    _id : "6282689f3072026523ba8c13", 
    created_at : "2022-05-24T15:04:11.540+0000", 
    text : "welcome to my third tweet Farida", 
    user : "627f964d055a48cb594004c5", 
    favorites : [
    ], 
    //mention : "admin2", 
    retweetUsers : [
    ], 
    hasImage : false,
  },
  //////////////tweets created by sameh////////////
  {
    _id : "7282689f3072026523ba8c11", 
    created_at : "2022-05-23T15:04:11.540+0000", 
    text : "welcome to my first tweet SAMEH", 
    user : "63668d2e858900cb48ca48d7", 
    favorites : [
    ], 
    //mention : "admin2", 
    retweetUsers : [
    ], 
    hasImage : false,
  },
  {
    _id : "7282689f3072026523ba8c12", 
    created_at : "2022-05-24T15:04:11.540+0000", 
    text : "welcome to my second tweet SAMEH", 
    user : "63668d2e858900cb48ca48d7", 
    favorites : [
    ], 
    //mention : "admin2", 
    retweetUsers : [
    ], 
    hasImage : false,
  },
  {
    _id : "7282689f3072026523ba8c13", 
    created_at : "2022-05-24T15:09:11.540+0000", 
    text : "welcome to my third tweet SAMEH", 
    user : "63668d2e858900cb48ca48d7", 
    favorites : [
    ], 
    //mention : "admin2", 
    retweetUsers : [
    ], 
    hasImage : false,
  },

]


<<<<<<< HEAD
//module.exports.connect = async () =>
=======
module.exports.connect = async () =>
>>>>>>> 906fd009ed55ec491c96647bf6b369a5643ceecd

class TweetsSeeder extends Seeder {
    async shouldRun() {
      return Tweet.countDocuments()
        .exec()
        .then(count => count === 0);
    }
  
    async run() {
      return Tweet.create(Tweetsdata);
    }
  }
  
  module.exports = TweetsSeeder;
