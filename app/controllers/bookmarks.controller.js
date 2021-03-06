require("dotenv").config();
const db = require("../models");
const User = db.user;
const Relation=db.relations;
const Tweet = db.tweet;


/**
 * 
 * @module bookmarks
 */

/**
 * @global
 * @typedef {object} reqBodyAddBookmark
 * @property {string} token the access token
 * @property {string} tweet_id the id of the tweet to be saved to bookmarks 

 */
/**
 *
 * @global
 * @typedef {object}  responseBodyAddBookmark
 * @property {object}  tweetSavedToBookmarks  tweet object represent the tweet added
 */
/** 
 * This function adds a tweet to the bookmarks if it wasnot saved before by the user and returns the saved tweet 
 * 
 * 
 * @param {reqBodyAddBookmark} req request sent from the front
 * @param {responseBodyAddBookmark} res response sent to the front
 * 
 */

exports.addBookmark= async(req,res)=>{
    const user = await  User.findOne({ _id :  req.userId});
    const tweet=await Tweet.findOne({_id: req.params.id});
    mark=[];
    for (let index = 0; index < user.bookMarks.length; index++) {
        mark.push(user.bookMarks[index]._id);
    } 
    
    if(mark.toString().includes((req.params.id).toString())){
        res.status(400).send({message:"already saved",savedbookMark:tweet});
    }
    else{
        await User.updateOne({bookMarks : user.bookMarks },{ $push: {bookMarks : tweet} });
        res.status(200).send({message:"done",savedbookMark:tweet});
    }
}


/**
 * 
 * @module bookmarks
 */

/**
 * @global
 * @typedef {object} reqBodyRemoveBookmark
 * @property {string} token the access token
 * @property {string} tweet_id the id of the tweet to be removed from bookmarks 

 */
/**
 *
 * @global
 * @typedef {object}  responseBodyRemoveBookmark
 * @property {object}  tweetRemovedFromBookmarks  tweet object represent the tweet removed
 */
/** 
 * This function removed a tweet from the bookmarks if it was saved before by the user and returns the removed tweet 
 * 
 * 
 * @param {reqBodyRemoveBookmark} req request sent from the front
 * @param {responseBodyRemoveBookmark} res response sent to the front
 * 
 */

exports.removeBookmark =async(req,res)=>{
    const user = await  User.findOne({ _id :  req.userId});
    console.log(req.params.id);
    const tweet=await Tweet.findOne({_id:req.params.id});
    console.log(tweet);
    await User.updateOne({_id:req.userId },{ $pull: {bookMarks : {_id : tweet._id}} });
    res.status(200).send({message:"done",deletedBookMark:tweet});

}

/**
 * 
 * @module bookmarks
 */

/**
 * @global
 * @typedef {object} reqBodyGetBookmarks
 * @property {string} token the access token 
 */
/**
 *
 * @global
 * @typedef {object}  responseBodyGetBookmarks
 * @property {object}  tweetsFromBookmarks  tweet objects representing the tweets present in a user's bookmarks
 */
/** 
 * This function gets the tweets from the bookmarks of the user 
 * 
 * 
 * @param {reqBodyGetBookmarks} req request sent from the front
 * @param {responseBodyGetBookmarks} res response sent to the front
 * 
 */

exports.getBookmarks=async(req,res)=>{
   const user=await User.findOne({_id:req.userId});
   const bookmarks= user.bookMarks;
   console.log(bookmarks);
   res.status(200).send({message:"done",bookmarks:bookmarks});
}


/**
 * 
 * @module bookmarks
 */

/**
 * @global
 * @typedef {object} reqBodyRemoveBookmarks
 * @property {string} token the access token
 * @property {string} tweet_id the id of the tweet to be removed from bookmarks 

 */
/** 
 * This function removes all tweets from the bookmarks if it was saved before by the user 
 * 
 * 
 * @param {reqBodyRemoveBookmark} req request sent from the front
 * 
 */
exports.deleteAllBookmarks=async(req,res)=>{
    const user=await User.findOne({_id:req.userId});
    const bookmarks= user.bookMarks;
    console.log(bookmarks);
   // await User.updateOne({_id:req.userId },{ $set: {bookMarks : {_id : bookmarks}} });
    await User.updateOne({_id:req.userId},{$set:{bookMarks:[]}});
    res.status(200).send({message:"done"});
}