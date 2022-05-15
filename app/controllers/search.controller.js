require("dotenv").config();
const db = require("../models");
const User = db.user;
const Relation=db.relations;
const Tweet = db.tweet;
const {searchUserByName, searchMentions,searchUserByUserName , searchTweetText ,searchPhotos} = require("../utils/search.js");


/**
 * 
 * @module search
 */

/**
 * @global
 * @typedef {object} reqBodySearchTop
 * @property {string} token the access token
 * @property {string} text the text of the user wants to search for  

 */
/**
 *
 * @global
 * @typedef {object}  responseBodySearchTop
 * @property {object}  tweets  tweet object represent the tweet matching search 
 * @property {object} UserName user object matching the search
 * @property {object} mentions tweets with mentions matching the search 
 * @property {object} names user object with name matching the search 
 */
/** 
 * This function searches for usernames and mentions if user types @ in begining of text and for names and tweets if else and returns the found data as user and/or tweet object 
 * saves the text written by user 
 * 
 * @param {reqBodySearchTop} req request sent from the front
 * @param {responseBodySearchTop} res response sent to the front
 * 
 */

exports.searchTop =  async (req, res) =>{
    if(req.query.text[0]=="@"){
        let username=req.query.text.substring(1);
        const userName = await  searchUserByUserName(username,req.userId);
        const Mentioned = await searchMentions(req.query.text);
        const user = await  User.findOne({ _id :  req.userId}); 
        const saved=user.savedText;
        
        if (user != null){
            if(saved.includes(req.query.text)){
                res.status(200).send({message: "okay!",  usernames: userName , mentions : Mentioned});  
            }
            else{
                await User.updateOne({savedText : user.savedText },{ $push: { savedText : req.query.text} });  
                res.status(200).send({message: "okay!",  usernames: userName , mentions : Mentioned});
          }
        }

         
 
    } 
    else {
       const users = await  searchUserByName(req.query.text,req.userId);
       const tweets = await  searchTweetText(req.query.text);
        const user = await  User.findOne({ _id :  req.userId});
        const saved=user.savedText;
 
        if (user != null){
            if(saved.includes(req.query.text)){
                res.status(200).send({message: "okay!", user: users  , tweets: tweets });   
            }
            else{
                await User.updateOne({savedText : user.savedText },{ $push: { savedText : req.query.text} });  
                res.status(200).send({message: "okay!", user: users  , tweets: tweets }); 
          }
        }

       
     }
    
}



/**
 * 
 * @module search
 */

/**
 * @global
 * @typedef {object} reqBodySearcPeople
 * @property {string} token the access token
 * @property {string} text the text of the user wants to search for  

 */
/**
 *
 * @global
 * @typedef {object}  responseBodySearchPeople 
 * @property {object} UserName user object matching the search 
 * @property {object} names user object with name matching the search 
 */
/** 
 * This function searches for usernames  if user types @ in begining of text and for names if else and returns the found data as user object 
 * saves the text written by the user to the saved searches 
 * 
 * @param {reqBodySearchPeople} req request sent from the front
 * @param {responseBodySearchPeople} res response sent to the front
 * 
 */
exports.searchPeople =  async (req, res) =>{
    if(req.query.text[0]=="@"){
        let username=req.query.text.substring(1);
        const userName = await  searchUserByUserName(username,req.userId);
        if((!userName)||(userName.length==0)){
    
            res.status(404).send({message: "Failed! name or user name not found"});
             
        }
        else{
            const user = await  User.findOne({ _id :  req.userId});
            const saved=user.savedText;

            if (user != null){
                if(saved.includes(req.query.text)){
                    
                    res.status(200).send({message: "okay!", usernames:userName }); 
              }
            else{
                await User.updateOne({savedText : user.savedText },{ $push: { savedText : req.query.text} }); 
                res.status(200).send({message: "okay!", usernames:userName });
            }
        }
    } }
    else{
    const users = await  searchUserByName(req.query.text,req.userId);
    
    if((!users)||(users.length==0)){
    
        res.status(404).send({message: "Failed! name or user name not found"});
         
    }
    else{
        const user = await  User.findOne({ _id :  req.userId});
        const saved=user.savedText;
        if (user != null){
            if(saved.includes(req.query.text)){ 
                res.status(200).send({message: "okay!", user: users}); 
          }
           else{
            await User.updateOne({savedText : user.savedText },{ $push: { savedText : req.query.text} }); 
            res.status(200).send({message: "okay!", user: users}); 
           }
        }
    
    }
}
}



/**
 * 
 * @module search
 */

/**
 * @global
 * @typedef {object} reqBodySearchLatest
 * @property {string} token the access token
 * @property {string} text the text of the user wants to search for  

 */
/**
 *
 * @global
 * @typedef {object}  responseBodySearchLatest
 * @property {object}  tweets  tweet object represent the tweet matching search  
 */
/** 
 * This function searches for tweets and returns the found data as tweet object 
 * save the text searched 
 * 
 * @param {reqBodySearchLatest} req request sent from the front
 * @param {responseBodySearchLatest} res response sent to the front
 * 
 */
exports.seachLatest =  async (req, res) =>{
    const tweets = await  searchTweetText(req.query.text);

    if(tweets.length==0){ 
        res.status(404).send({message: "Failed! tweet text not found"});  
    }
    else{
      const user = await  User.findOne({ _id :  req.userId});
      const saved=user.savedText;
      if (user != null){
          if(saved.includes(req.query.text)){
            res.status(200).send({message: "okay!", tweets: tweets});
        }
            else{ 
                   await User.updateOne({savedText : user.savedText },{ $push: { savedText : req.query.text} });
                   res.status(200).send({message: "okay!", tweets: tweets});
                }
        
    } }   
}



/**
 * 
 * @module search
 */

/**
 * @global
 * @typedef {object} reqBodySearchPhotos
 * @property {string} token the access token
 * @property {string} text the text of the user wants to search for  

 */
/**
 *
 * @global
 * @typedef {object}  responseBodySearchPhotos
 * @property {object}  tweets  tweet object represent the tweet matching search  
 */
/** 
 * This function searches for tweets that have photos in it and returns the found data as tweet object 
 * save the text searched 
 * 
 * @param {reqBodySearchPhotos} req request sent from the front
 * @param {responseBodySearchPhotos} res response sent to the front
 * 
 */
exports.searchPhotos=async(req,res)=>{
    const tweets = await  searchPhotos(req.query.text);

    if(tweets.length==0){ 
        res.status(404).send({message: "Failed! tweet text not found"});  
    }
    else{
      const user = await  User.findOne({ _id :  req.userId});
      const saved=user.savedText;
      if (user != null){
          if(saved.includes(req.query.text)){
            res.status(200).send({message: "okay!", tweets: tweets});
        }
            else{ 
                   await User.updateOne({savedText : user.savedText },{ $push: { savedText : req.query.text} });
                   res.status(200).send({message: "okay!", tweets: tweets});
                }
        
    } }
}



/**
 * 
 * @module search
 */

/**
 * @global
 * @typedef {object} reqBodySaveSearchedUser
 * @property {string} token the access token
 * @property {string} user_id the id of the user to save   
 */
/**
 *
 * @global
 * @typedef {object}  responseBodySaveSearchedUser
 * @property {object}  savedUser  user object represent the user that has been saved  
 */
/** 
 * This function saves a searched user if a user was searched for and clicked  
 * 
 * @param {reqBodySaveSearchedUser} req request sent from the front
 * @param {responseBodySaveSearchedUser} res response sent to the front
 * 
 */
exports.saveSearchedUser = async(req,res)=>{
    //const suser=await User.findOne({_id:req.params.id});
    const user = await  User.findOne({ _id :  req.userId});
    const savedUser= user.savedUsers;
    if (user != null){
        if(savedUser.includes(req.params.id)){
        
            res.status(200).send({message:"already saved",savedsearchedUser:req.params.id});  
    }
        else{
            await User.updateOne({_id:req.userId },{ $push: { savedUsers : req.params.id} });
            res.status(200).send({message:"done",savedsearchedUser:req.params.id});
        }}
}



/**
 * 
 * @module search
 */

/**
 * @global
 * @typedef {object} reqBodyDeleteSearch
 * @property {string} token the access token
 * @property {string} text the id of the user/text to delete   
 */
/**
 *
 * @global
 * @typedef {object}  responseBodyDeleteSearch
 * @property {object}  Deleted  represents the deleted searches  
 */
/** 
 * This function deletes a saved search   
 * 
 * @param {reqBodyDeleteSearch} req request sent from the front
 * @param {responseBodyDeleteSearch} res response sent to the front
 * 
 */
exports.deleteSearch= async(req,res)=>{
    const user=await User.findOne({_id:req.userId});
    const savedUser=user.savedUsers;
    const savedText=user.savedText;
    if(savedText.includes(req.params.id)){
        await User.updateOne({_id:req.userId},{$pull:{savedText:req.params.id}});
    }
    if(savedUser.includes(req.params.id)){
        await User.updateOne({_id:req.userId},{$pull:{savedUsers:req.params.id}});
    }
    res.status(200).send({message:"done",removed: req.params.id});

}



/**
 * 
 * @module search
 */

/**
 * @global
 * @typedef {object} reqBodygetSavedSearch
 * @property {string} token the access token   
 */
/**
 *
 * @global
 * @typedef {object}  responseBodygetSavedSearch
 * @property {object}  savedUser  user object represent the user that are in the saved searches
 * @property {object} savedtext text of the searches saved  
 */
/** 
 * This function saves a searched user if a user was searched for and clicked  
 * 
 * @param {reqBodygetSavedSearch} req request sent from the front
 * @param {responseBodygetSavedSearch} res response sent to the front
 * 
 */
exports.getSavedSearch=async(req,res)=>{

    const user=await User.findOne({_id:req.userId});
    const savedUser=user.savedUsers;
    const savedText=user.savedText;
    res.status(200).send({message:"done",savedUsers:savedUser , savedText:savedText});
}


/**
 * 
 * @module search
 */

/**
 * @global
 * @typedef {object} reqBodyDeleteAllSearch
 * @property {string} token the access token
 * @property {string} text the id of the user/text to delete   
 */
/**
 *
 * @global
 * @typedef {object}  responseBodyDeleteAllSearch
 * @property {object}  Deleted  represents the deleted searches  
 */
/** 
 * This function deletes a saved search   
 * 
 * @param {reqBodyDeleteAllSearch} req request sent from the front
 * @param {responseBodyDeleteAllSearch} res response sent to the front
 * 
 */
exports.deleteAllSearch=async(req,res)=>{
    const user=await User.findOne({_id:req.userId});
    const savedUser=user.savedUsers;
    const savedText=user.savedText;
    if(savedText.length>0){
        await User.updateOne({_id:req.userId},{$set:{savedText:[]}});
    }
    if(savedUser.length>0){
        await User.updateOne({_id:req.userId},{$set:{savedUsers:[]}});
    }
    res.status(200).send({message:"done",savedUsers:savedUser , savedText:savedText});
}