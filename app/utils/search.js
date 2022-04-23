//const { searchUserByName } = require("../controllers/search.controller");
const db = require("../models");
const User = db.user;
const tweet = db.tweet;
require("dotenv").config();

exports.searchUserByName = async (name) => {
    const userFound = await db.user.find({ name: { $regex: `${name}` , $options : 'i' } });
    console.log(userFound);
    return userFound;
    
}

exports.searchUserByUserName = async (username) => {
    const userFound = await db.user.find({ username: { $regex: `${username}` , $options : 'i' } });
    console.log(userFound);
    return userFound;
}

exports.searchTweetText = async (text) => {
    const tweetFound = await tweet.find({ text: { $regex: `${text}` , $options : 'i' } }).sort( {created_at : 1} );
    console.log(tweetFound);
    return tweetFound; 
}

exports.searchMentions = async (text)=>{
    const Mentioned = await tweet.find({text : {$regex: `${text}` , $options : 'i' } });
    return Mentioned; 
}
