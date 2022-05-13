const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require("./user.model");
db.tweet = require("./tweet.model");
db.notification = require("./notification.model");
db.relations= require("./relations.model");

module.exports = db;
