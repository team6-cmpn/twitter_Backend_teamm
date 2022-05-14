//const { searchUserByName } = require("../controllers/search.controller");
const { relations } = require("../models");
const db = require("../models");
const User = db.user;
const tweet = db.tweet;
const Relation = db.relations;
require("dotenv").config();
exports.getUsersFromArray = async(list) =>
{
    objectsList=[];
    for (i=0;i<list.length;i++)
    {
        try {
            user = await  User.find({ _id :  list[i]  }  );
        } catch (error) {
            return "user not found";
        }
        objectsList.push(user[0]);
    }
    console.log(objectsList);
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
        //console.log(user.relations[0]);
        for(i=0;i<user.relations.length;i++){
            const relation = await Relation.findOne({ _id :  user.relations[i]  });
            //console.log(i);
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
                dataList.push(relations.user_id);
            } 
        }
        //console.log(dataList);
        return dataList;
    }
}