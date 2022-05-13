const { searchUserByName } = require("../controllers/search.controller");
const db = require("../models");
const User = db.user;
const tweet = db.tweet;
const Relation = db.relations;
require("dotenv").config();
exports.getListRelations= async(id,data) =>
{
    dataList = [];
    const user = await  User.findOne({ _id :  id  }  );
    if (user != null){
    //console.log(user.relations[0]);
    if (data=="followers")
    {
        for(i=0;i<user.relations.length;i++){
        const relation = await Relation.findOne({ _id :  user.relations[i]  });
      //  console.log(i);
            if (relation.follower==true){
            //    console.log(relation);
                dataList.push(relation.user_id);
            }
        }
    }
    return dataList;
    }
    if (user == null){
      res.status(404).send({ message: "User Not found." });
    }
}
