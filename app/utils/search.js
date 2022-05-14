const db = require("../models");
const User = db.user;
const tweet = db.tweet;
require("dotenv").config();
const { getListRelationsIDs } = require("../utils/user.js");

exports.searchUserByName = async (name,user_id) => {
    var searchedUsers=[];
    var searchedNFUsers=[];
    var retSearchedUsers=[];
    userFound = await db.user.find({ name: { $regex: `${name}` , $options : 'i' } }).sort({followers_count:1});
    followers=await getListRelationsIDs(user_id,"following");
    followers = followers.toString();
    
    for (let index = 0; index < userFound.length; index++) {
        
        if(followers.includes(userFound[index]._id.toString())){
            searchedUsers.push(userFound[index]);
        }
        else{
            searchedNFUsers.push(userFound[index]);
        }
    }
    retSearchedUsers.push(searchedUsers);
    retSearchedUsers.push(searchedNFUsers);
    return retSearchedUsers;
    
}

exports.searchUserByUserName = async (username,user_id) => {
    var searchedUsers=[];
    var searchedNFUsers=[];
    var retSearchedUsers=[];
    const userFound = await db.user.find({ username: { $regex: `${username}` , $options : 'i' } }).sort({followers_count:1});
    followers=await getListRelationsIDs(user_id,"following");
    followers = followers.toString();
    
    for (let index = 0; index < userFound.length; index++) {
        
        if(followers.includes(userFound[index]._id.toString())){
            searchedUsers.push(userFound[index]);
        }
        else{
            searchedNFUsers.push(userFound[index]);
        }
    }
    retSearchedUsers.push(searchedUsers);
    retSearchedUsers.push(searchedNFUsers);
    return retSearchedUsers;
}

exports.searchTweetText = async (text) => {
    const tweetFound = await tweet.find({ text: { $regex: `${text}` , $options : 'i' } }).sort( {created_at : 1} );
    return tweetFound; 
}

exports.searchMentions = async (mention)=>{
    const Mentioned = await tweet.find({mention : {$regex: `${mention}` , $options : 'i' } });
    return Mentioned; 
}

exports.searchPhotos =async (text)=>{
    
    const tweetFound = await tweet.find({ text: { $regex: `${text}` , $options : 'i' }}).where('hasImage').equals(true).sort( {created_at : 1} );
    return tweetFound;
}