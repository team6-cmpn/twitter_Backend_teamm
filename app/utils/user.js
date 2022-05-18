//const { searchUserByName } = require("../controllers/search.controller");
const { relations } = require("../models");
const db = require("../models");
const User = db.user;
const Tweet = db.tweet;
const Relation = db.relations;
require("dotenv").config();
exports.getUsersFromArray = async(list) =>
{
    objectsList=[];
    for (i=0;i<list.length;i++)
    {
        try {
            user = await  User.find({ _id :  list[i]  }  );
            if (!user[0])
            {
                return "User Not found";
            }
        } catch (error) {
            return "User Not found";
        }
        objectsList.push(user[0]);
    }
    ////console.log(objectsList);
    return objectsList;
}
exports.getUsersRelationsList= async(id,data) =>
{
    const usersIDs = await this.getListRelationsIDs(id,data);
    if (usersIDs=="user not found"){
        return "user not found";
    }
    const users = await this.getUsersFromArray(usersIDs);
    return users
}
exports.getListRelationsIDs= async(id,data) =>
{
    dataList = [];
    user=[];
    try {
        user = await  User.find({ _id :  id  }  );
        
    } catch (error) {
        return "user not found";
    }
    user=user[0] 
    if (user != null){
        ////console.log(user.relations);
        ////console.log(user.relations[0]);
        for(i=0;i<user.relations.length;i++){
            relation = await Relation.findOne({ _id :  user.relations[i]  });
            ////console.log(relation._id);
            //followers who follow the user ID
            if (data =="followers" && relation.follower==true){
                
                dataList.push(relation.user_id);
            }
            // following who the user ID is follow
            if (data =="following" && relation.following==true){
                
                dataList.push(relation.user_id);
            }
            if (data == "blocked" && relation.blocked==true){
                dataList.push(relation.user_id);
            }
            if (data == "muted" && relation.mute==true){
                dataList.push(relation.user_id);
            }  
        }
        console.log(dataList);
        if (dataList.length==0){
            return "user not found";
        }
        return dataList;
    }
}

exports.createNewRelation= async(targetUser)=>
{
    //////console.log(targetUser);
    const relation = new Relation({
      user_id: targetUser._id,
      username: targetUser.username,
      name: targetUser.name,
      following: false,
      follower: false,
      blocked: false,
      mute: false,
      mute_until: null,
      want_retweets: false,
      no_retweets: false,
      all_replies: false,
      marked_spam: false,
      blocked_by: null,
      following_request_sent: false,
      following_request_received: false,
      Notifications_enabled: false,
      created_at: new Date(),
    });
    return relation;
}

exports.setRelationtoBlock=async(id,data)=>
{
    await Relation.updateOne({_id : id},{$set :{following: false,
        follower: false,
        mute: false,
        mute_until: null,
        want_retweets: false,
        no_retweets: false,
        all_replies: false,
        marked_spam: false,
        following_request_sent: false,
        following_request_received: false,
        Notifications_enabled: false}});
    if (data="blocked"){
        await Relation.updateOne({_id : id},{$set :{blocked: true}});
    }
    else if (data="blocked_by"){
        await Relation.updateOne({_id : id},{$set :{blocked_by: true}});
    }
    return "relation updated";

}

exports.getTweetsFromUser=async(id)=>
{
    tweets=[];
    const allTweets=await Tweet.find();
    for (i=0;i<allTweets.length;i++){
        if (allTweets[i].user.toString()==id.toString()){
            tweets.push(allTweets[i]);
        }
    }
    return tweets;
}