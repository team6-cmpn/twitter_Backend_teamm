require("dotenv").config();
const User = require("./app/seeders/User.seeder");
const Tweet = require("./app/seeders/Tweet.seeder");
const db = require("./app/models");
const mongoose = require('mongoose');


const mongoURL = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}` || 'mongodb://localhost:27017/Twitter_db';






module.exports.seedersList = { User,Tweet };



module.exports.connect = async () =>

await mongoose.connect('mongodb://localhost:27017/Twitter_db', {
    useNewUrlParser: true,
  //  useCreateIndex: true,
//  useFindAndModify: false,
    useUnifiedTopology: true,
  });


module.exports.dropdb = async () => mongoose.connection.db.dropDatabase();
