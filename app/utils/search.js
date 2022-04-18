//const { searchUserByName } = require("../controllers/search.controller");
const db = require("../models");
const User = db.user;
require("dotenv").config();

exports.searchUserByName = async (name) => {
    //var userFound;
    // db.user.find({ name: { $regex:name } })
    // .exec((err, users) => {
    //     console.log(users);
    //     userFound =users;
    // });
    const userFound = await db.user.find({ name: { $regex:name } });
    // db.user.find({ name: { $regex:name } }, function (err, docs) {
    //     console.log(docs);
    //     userFound = docs;
    //     return "true";
    // });
    console.log(userFound);
    //return "out of find";
    return userFound;
    //return db.user.find({ name: { $regex:name } });
}

exports.searchByUserName = (userName) => {
    db.products.find ( { username: { $regex: userName /i } } )
}

exports.searchTweetText = (tweetText) => {
    db.products.find ( { tweetText: { $regex: tweetText /i } } )
}