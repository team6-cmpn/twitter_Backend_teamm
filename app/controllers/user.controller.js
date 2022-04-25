
const db = require("../models");
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
    const users = [];
    //console.log(req.params.username);
    const usernamesArray= req.params.username.split(",");
    
    for (let i = 0; i < usernamesArray.length; i++) {
      const user = await User.find({ username :  usernamesArray[i] });
      if (user != null)
      {
      users.push(user);
      }
    }
    if (users.length==0){
      res.status(404).send({ message: "User Not found." });
    }else{
    res.status(200).send({user: users});
    }
    //res.status(200).send("ok");

    // users = await  User.find({ username :  req.params.username  });
  }

  exports.userFollowingIDs =  async (req, res) =>{
    const following = [];
    const user = await  User.findOne({ _id :  req.params.id  }  );
    if (user != null)
    {
    console.log(user.relations[0]);
    for(i=0;i<user.relations.length;i++){
      const relation = await Relation.findOne({ _id :  user.relations[i]  });
      console.log(relation);
      if (relation.following==true){
        following.push(relation.user_id);
      }
    }
    if (following.length==0){
      res.status(400).send({ message: "no following list." });
    }
    else{
    res.status(200).send(following);
    }
  }
    else if (user == null){
      res.status(404).send({ message: "User Not found." });
    }
}

  exports.userFollowingList =  async (req, res) =>{
    const following = [];
    const user = await  User.findOne({ _id :  req.params.id  }  );
    console.log(user.relations[0]);
    for(i=0;i<user.relations.length;i++){
      const relation = await Relation.findOne({ _id :  user.relations[i]  });
      console.log(relation);
      if (relation.following==true){
        const followingUser = await User.findOne({ _id :  relation.user_id  });
        following.push(followingUser);
      }
    }
    res.status(200).send(following);
  }


exports.userFollowersIDs =  async (req, res) =>{
  const followers = [];
    const user = await  User.findOne({ _id :  req.params.id  }  );
    console.log(user.relations[0]);
    for(i=0;i<user.relations.length;i++){
      const relation = await Relation.findOne({ _id :  user.relations[i]  });
      console.log(relation);
      if (relation.follower==true){

        followers.push(relation.user_id);
      }
    }
    res.status(200).send(followers);
}

exports.userFollowersList =  async (req, res) =>{
  const followers = [];
    const user = await  User.findOne({ _id :  req.params.id  }  );
    console.log(user.relations[0]);
    for(i=0;i<user.relations.length;i++){
      const relation = await Relation.findOne({ _id :  user.relations[i]  });
      console.log(relation);
      if (relation.follower==true){
        const followerUser = await User.findOne({ _id :  relation.user_id  });
        followers.push(followerUser);
      }
    }
    res.status(200).send(followers);
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
exports.friendshipsCreate = async (req, res) =>{
  found=0; // 0 not found , 1 found 
  const user = await  User.findOne({ _id :  req.userId});
  const relations = user.relations;
  for (i = 0; i < relations.length; i++) {
    const relation = await Relation.findOne({ _id :  relations[i]  });
    if (relation != null &&(relation.user_id==req.params.id)&&(relation.following==false)){
      found=1;
      await Relation.updateOne({ _id :  relation._id  }, { $set: { following: true } });
       res.status(200).send("following");
       return;
    }
    else if (relation != null && (relation.user_id==req.params.id)&&(relation.following==true)){
      found=1;
      res.status(403).send("the user is already following the user");
      return;
    }
  }
  if (found==0){
    const targetUser= await User.findOne({ 
      //_id :  req.params.target_id,
      username: "ola"  });
    console.log(targetUser);
    const relation = new Relation({
      user_id: targetUser._id,
      username: targetUser.username,
      name: targetUser.name,
      following: true,
      follower: false,
      blocked: false,
      mute: false,
      mute_until: null,
      want_retweets: true,
      no_retweets: false,
      all_replies: false,
      marked_spam: false,
      blocked_by: null,
      following_request_sent: false,
      following_request_received: false,
      Notifications_enabled: true,
      created_at: new Date(),
    });
    await relation.save();
    await User.updateOne({ _id :  user._id  }, { $push: { relations: relation._id } });
    const receiveRlation = new Relation({
      user_id: user.id,
      username: user.username,
      name: user.name,
      following: false,
      follower: true,
      blocked: false,
      mute: false,
      mute_until: null,
      want_retweets: true,
      no_retweets: false,
      all_replies: false,
      marked_spam: false,
      blocked_by: null,
      following_request_sent: false,
      following_request_received: false,
      Notifications_enabled: false,
      created_at: new Date(),
    });
    await receiveRlation.save();
    await User.updateOne({ _id :  req.params.id  }, { $push: { relations: receiveRlation._id } });
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


exports.userBlocksIDs =  async (req, res) =>{
  const blocks = [];
    const user = await  User.findOne({ _id :  req.userId  }  );
    console.log(user.relations[0]);
    for(i=0;i<user.relations.length;i++){
      const relation = await Relation.findOne({ _id :  user.relations[i]  });
      console.log(relation);
      if (relation.blocked==true){

        blocks.push(relation.user_id);
      }
    }
    res.status(200).send(blocks);
}

exports.userBlocksList =  async (req, res) =>{
  const blocks = [];
    const user = await  User.findOne({ _id :  req.userId  }  );
    console.log(user.relations[0]);
    for(i=0;i<user.relations.length;i++){
      const relation = await Relation.findOne({ _id :  user.relations[i]  });
      console.log(relation);
      if (relation.blocked==true){
        const blockedUser = await User.findOne({ _id :  relation.user_id  });
        blocks.push(blockedUser);
      }
    }
    res.status(200).send(blocks);
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

