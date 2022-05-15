const db = require("../models");
const { findOne } = require("../models/user.model");
const {getListRelationsIDs,getUsersFromArray,getUsersRelationsList,createNewRelation,setRelationtoBlock} = require("../utils/user.js")

const User = db.user;
const Relation=db.relations;
const Tweet = db.tweet;
require("dotenv").config();
exports.userBoard = (req, res) => {
  res.status(200).send({userid : req.userId});
};

exports.userShow =  async (req, res)  => {
  const users = await  User.find({ _id :  req.params.id  }  );
    if (users[0]==null) {
      return res.status(404).send({ message: "User Not found." });
    }
  res.status(200).send({user: users});
  }

exports.usersLookup =  async (req, res) =>{
  //console.log(req.params.username);
  const userIDsArray= req.params.ids.split(",");
  const users= await getUsersFromArray(userIDsArray);
  if (users.length==0 | users=="user not found"){
    res.status(404).send({ message: "Users Not found." });
  }else{
    res.status(200).send({user: users});
  }
  //res.status(200).send("ok");
  
  // users = await  User.find({ username :  req.params.username  });
}


exports.userBlocksIDs =  async (req, res) =>{
  const blocks = await getListRelationsIDs(req.params.id, "blocked");
  if (blocks=="user not found")
  {
    res.status(404).send(blocks);
  }
  res.status(200).send(blocks);
}

exports.userFollowersIDs =  async (req, res) =>{
  const followers = await getListRelationsIDs(req.params.id, "followers");
  if (followers=="user not found")
  {
    res.status(404).send(followers);
  }
  res.status(200).send(followers);
}
exports.userFollowingIDs =  async (req, res) =>{
  const following = await getListRelationsIDs(req.params.id, "following");
  if (following=="user not found")
  {
    res.status(404).send(following);
  }
  res.status(200).send(following);
}  

exports.userFollowingList =  async (req, res) =>{
  const following = await getUsersRelationsList(req.params.id, "following");
  if(following=="user not found"){
    res.status(404).send(following);
  }
  res.status(200).send(following);
}



exports.userFollowersList =  async (req, res) =>{
  const followers = await getUsersRelationsList(req.params.id, "followers");
  if(followers=="user not found"){
    res.status(404).send(followers);
  }
  res.status(200).send(followers);
}

exports.userBlocksList =  async (req, res) =>{
  const blocks = await getUsersRelationsList(req.params.id, "blocked");
  if(blocks=="user not found"){
    res.status(404).send(blocks);
  }
  res.status(200).send(blocks);
}

exports.userMutedIDs =  async (req, res) =>{
  const muted = await getListRelationsIDs(req.params.id, "muted");
  if(muted=="user not found"){
    res.status(404).send(muted);
  }
  res.status(200).send(muted);
}

exports.userMutedList = async (req, res) =>{
  const muted = await getUsersRelationsList(req.params.id, "muted");
  if(muted=="user not found"){
    res.status(404).send(muted);
  }
  res.status(200).send(muted);
}

exports.friendshipsLookup =  async (req, res) =>{
    const users = [];
    const userParamtersArray= req.params.id.split(",");
    const user= await User.findOne({ _id :  req.userId  });
    const relations = user.relations;
    for (let i = 0; i < relations.length; i++) {
      const relation = await Relation.findOne({ _id :  relations[i]  });
      for (let j = 0; j < userParamtersArray.length; j++) {
        if (relation.user_id==userParamtersArray[j]){
          const relationObject=
          {"name": relation.name,
          "username": relation.username,
          "id": relation.user_id,
          "connections": relation.connections,
        };
        users.push(relationObject);
        }

      }
    }
    console.log(users);
    res.status(200).send(users);
}
/// not used
exports.friendshipsNo_retweets = async (req, res) =>{
  const no_retweetsUsers = [];
    const user = await  User.findOne({ _id :  req.userId }  );
    console.log(user.relations[0]);
    for(i=0;i<user.relations.length;i++){
      const relation = await Relation.findOne({ _id :  user.relations[i]  });
      console.log(relation);
      if (relation.no_retweet==true){
        const no_retweetsUser = await User.findOne({ _id :  relation.user_id  });
        no_retweetsUsers.push(no_retweetsUser);
      }
    }
    res.status(200).send(no_retweetsUsers);
  }

exports.friendshipsShow = async (req, res) =>{
  found = 0;
  relationObject = {};
  const user = await  User.findOne({ _id :  req.params.source_id  }  );
  console.log(user);
  for(i=0;i<user.relations.length;i++){
    const relation = await Relation.findOne({ _id :  user.relations[i]  });
    if (relation!=null && relation.user_id==req.params.target_id){
      found=1;
      relationObject ={
        "source_username": user.username,
        "source_id": user.id,
        "target_id": relation.user_id,
        "target_username": relation.username,
        "following": relation.following,
        "followed_by": relation.follower,
        "blocked": relation.blocked,
        "mute": relation.mute,
        "mute_until": relation.mute_until,
        "want_retweets": relation.want_retweets,
        "no_retweet": relation.no_retweets,
        "all_replies": relation.all_replies,
        "marked_spam": relation.marked_spam,
        "blocked_by": relation.blocked_by,
        "following_request_sent": relation.following_request_sent,
        "following_request_received": relation.following_request_received,
        "Notifications_enabled": relation.Notifications_enabled,
      }
    }
  }
  if (found==1){
    res.status(200).send(relationObject);
  }
  else{
    console.log("not found");
    res.status(404).send("No relations");
  }
}

exports.userChangePhoneNumber = async (req, res) =>{
  await User.updateOne({ _id :  req.userId  }, { $set: { phone_number: req.body.phone_number } });
  res.status(200).send("phone number changed");}
  
  exports.userChangeUsername = async (req, res) =>{
    await User.updateOne({_id :  req.userId}, {$set: {username :  req.body.username}});
    res.status(200).send({ message: "Username changed successfully!" });}
    // const user = await User.findOne({_id :  req.userId});
  // if(req.body.username){
  //   var checkUsername = /^[a-zA-Z0-9.\-_$@*!]{3,30}$/;
  //   if (!(checkUsername.test(req.body.username) && req.body.username[0] == '@')){
  //     res.status(400).send({ message: "Failed! Username must start with @ and has no spaces or commas!" });
  //     return;
  //   }
  //   else if(req.body.username.length>30){
  //     res.status(400).send({ message: "Failed! Username must be less than 30 characters!" });
  //     return;
  //   }
  //   else if(await User.findOne({username :  req.body.username})){
  //     res.status(400).send({ message: "Failed! Username already exists!" });
  //     return;
  //   }
  //   else {
    //}
    	
 // }
  


exports.userChangeEmail = async (req, res) =>{
  // if(req.body.email){
  //   const checkEmail = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  //   const isValid = checkEmail.test(String(req.body.email).toLowerCase());
  //   if (!isValid){
  //     res.status(400).send({ message: "Failed! Email not valied!" });
  //     return;
  //   }
  //   else{
      await User.findOneAndUpdate({ _id :  req.userId }, { email: req.body.email });
      res.status(200).send({ message: "Email changed!" });
    // }
    // }
  }

exports.friendshipsCreate = async (req, res) =>{
  found=0; // 0 not found , 1 found 
  const user = await  User.findOne({ _id :  req.userId});
  const relations = user.relations;
  console.log(user); 
  if (relations)
  {
  for (i = 0; i < relations.length; i++) {
    const relation = await Relation.findOne({ _id :  relations[i]  });
    if (relation != null &&(relation.user_id==req.params.id)&&(relation.following==false)){
      found=1;
      await Relation.updateOne({ _id :  relation._id  }, { $set: { following: true } });
      await User.updateOne({ _id :  user._id  }, {$inc : {followings_count: 1 }}); 
      blockedUser= await User.findOne({_id:req.params.id});
       targetRelation=blockedUser.relations
        for (i=0;i<targetRelation.length;i++)
        {
          if (targetRelation[i].user_id == user._id){
            await Relation.updateOne({ _id :  targetRelation[i]._id  }, { $set: { follower: true } });
            await User.updateOne({ _id :  blockedUser._id  }, {$inc : {followers_count: 1 }});
          }
        }
      res.status(200).send("following");
       return;
    }
    else if (relation != null && (relation.user_id==req.params.id)&&(relation.following==true)){
      found=1;
      res.status(403).send("the user is already following the user");
      return;
    }
  }
}
  if (found==0){
    const targetUser= await User.findOne({ _id :  req.params.id });
    relation = await createNewRelation(targetUser);
    relation.following=true;
    relation.want_retweets=true;
    relation.Notifications_enabled=true;
    console.log(relation);
    await relation.save();
    await User.updateOne({ _id :  user._id  }, { $push: { relations: relation._id } });
    await User.updateOne({ _id :  user._id  }, {$inc : {followings_count: 1 }}); 
    receiveRlation = await createNewRelation(user);
    receiveRlation.follower=true;
    receiveRlation.want_retweets=true;
    await receiveRlation.save();
    await User.updateOne({ _id :  req.params.id  }, { $push: { relations: receiveRlation._id } });
    await User.updateOne({ _id :  req.params._id  }, {$inc : {followers_count: 1 }}); 
    res.status(200).send(targetUser);
    return;
  }
}



exports.friendshipsDestroy = async (req, res) =>{
  found=0; // 0 not found , 1 found
  const user = await  User.findOne({ _id :  req.userId});
  if (user != null){
  const targetUser = await User.findOne({ _id :  req.params.id  });
  const targetRelations = targetUser.relations
  const relations = user.relations;
  for (i = 0; i < relations.length; i++) {
    const relation = await Relation.findOne({ _id :  relations[i]  });
    if (relation != null && (relation.user_id==req.params.id)&&(relation.following==true)){
      console.log("11111111")
      found=1;
      await Relation.updateOne({ _id :  relation._id  }, { $set: { following: false } });
      for (i=0;i<targetRelations.length;i++)
      {
        if (targetRelations[i].user_id == user._id){
          await Relation.updateOne({ _id :  targetRelations[i]._id  }, { $set: { follower: false } });
        }
      }
      res.status(200).send(targetUser);
      return;
    }
    else if (relation != null && (relation.user_id==req.params.id)&&(relation.following==false)){
      found=1;
      console.log("11111111")
      res.status(403).send("the user is not following the user");
      return;
    }
  }
  if (found==0){
    res.status(404).send("No relations");
    return;
  }
}
else {
  res.status(404).send("No user found")
  return;
}
}



exports.friendshipsUpdate = async (req, res) =>{
  found=0; // 0 not found , 1 found
  const user = await  User.findOne({ _id :  req.userId});
  const relations = user.relations;
  for (i = 0; i < relations.length; i++) {
    const relation = await Relation.findOne({ _id :  relations[i]  });
    if (relation != null && relation.user_id==req.params.id){
      found=1;
      state=relation.following;
      await Relation.updateOne({ _id :  relation._id  }, { $set: { following: !state} });
      res.status(200).send("freindship updated");
      return;
    }
  }
  if (found==0){
    res.status(404).send("No relations");
    return;
  }
}

exports.userBlocking = async(req,res)=>
{
  found=0; // 0 not found , 1 found 
  const user = await  User.findOne({ _id :  req.userId});
  const relations = user.relations; 
  if (relations)
  {
  for (i = 0; i < relations.length; i++) {
    relation = await Relation.findOne({ _id :  relations[i]  });
    if (relation != null &&(relation.user_id==req.params.id)&&(relation.blocked==false)){
      found=1;
      
      //await Relation.updateOne({ _id :  relation._id  }, { $set: { following: true } });
       block = await setRelationtoBlock(relation._id,"blocked");
       blockedUser= await User.findOne({_id:req.params.id});
       targetRelation=blockedUser.relations
        for (i=0;i<targetRelation.length;i++)
        {
          if (targetRelation[i].user_id == user._id){
            await setRelationtoBlock(targetRelation[i]._id,"blocked_by");
          }
        }
      res.status(200).send("blocked");  
       return;
    }
    else if (relation != null && (relation.user_id==req.params.id)&&(relation.blocked==true)){
      found=1;
      res.status(403).send("the user is already blocking the user");
      return;
    } 
  } 
} 
  if (found==0){
    const targetUser= await User.findOne({ _id :  req.params.id });
    relation = await createNewRelation(targetUser);
    relation.blocked=true;
    await relation.save();
    await User.updateOne({ _id :  user._id  }, { $push: { relations: relation._id } });
    receiveRlation = await createNewRelation(user);
    receiveRlation.blocked_by=true;
    await receiveRlation.save();
    await User.updateOne({ _id :  req.params.id  }, { $push: { relations: receiveRlation._id } });
    res.status(200).send(targetUser);
    return;
  }
}
exports.userUpdateProfile = async (req, res) =>{
  const user = await  User.findOne({ _id :  req.userId});
  if (user != null){
    await User.updateOne({ _id :  user._id  }, { $set: { name: req.body.name ,description:req.body.description} });
    console.log(user)
    res.status(200).send("profile updated");
    return;
  }
  else{
    res.status(404).send("No user found");
    return;
  }
}
///// used after omnya 
exports.userMediaList = async (req, res) =>{
  const user = await  User.findOne({ _id :  req.userId});
  if (user != null){
    tweets=[]
    const media = await Tweet.find({user_id:user._id});
    for(i=0;i<media.length;i++)
    {
      if (media.hasImage==true)
      {
        tweets.push(media[i]);
      }
    }
    res.status(200).send(tweets);
  }
  else{
    res.status(404).send("No user found");
    return;
  }
}


exports.userTweetsList = async (req, res) =>{

  const authUser = await  User.findOne({ _id :  req.userId  }  );
  if (authUser != null){
    const tweets = [];
    const tweet = await Tweet.find({ user: authUser._id   });
    res.status(200).send(tweet);
    return;
  }
  else{
    res.status(404).send("No user found");
    return;
  }
}

exports.userLikedTweetsList = async(req, res) =>{
  const authUser = await  User.findOne({ _id :  req.userId  }  );
  tweets=[]
  if (authUser != null){
    const tweetsIds =  authUser.likes5;
    for(i=0;i<tweetsIds.length;i++){
      tweet=await Tweet.findOne({ _id :  tweetsIds[i]  });
      tweets.push(tweet);
    }
    res.status(200).send(tweets);
    return;
  }
  else{
    res.status(404).send("No user found");
    return;
  }
} 












//   {
//     "relations" : [],
//     "username" : "ola",
//     "name" : "lolo",
//     "email" : "ola@mizo.com",
//     "password" : "$2a$08$GkF09rOy3Sq2EhxQisikd.iCSevn18uF9XXIyIEroR5t92w93EuBi",
//     "followers" : [],
//     "following" : [],
//     "created_at" : ISODate("2022-04-01T11:57:54.215Z"),
//     "confirmed" : true,
//     "__v" : 0 
// }

