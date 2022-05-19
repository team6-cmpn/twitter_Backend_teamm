require("dotenv").config();
const User = require("./app/seeders/User.seeder");
<<<<<<< HEAD
const Relation = require("./app/seeders/Relation.seeder");
=======
>>>>>>> 906fd009ed55ec491c96647bf6b369a5643ceecd
const Tweet = require("./app/seeders/Tweet.seeder");
const db = require("./app/models");
const mongoose = require('mongoose');


const mongoURL = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}` || 'mongodb://localhost:27017/Twitter_db';






<<<<<<< HEAD
module.exports.seedersList = { User,Tweet,Relation };
=======
module.exports.seedersList = { User, Tweet };
>>>>>>> 906fd009ed55ec491c96647bf6b369a5643ceecd



module.exports.connect = async () =>

await mongoose.connect('mongodb://localhost:27017/Twitter_db', {
    useNewUrlParser: true,
  //  useCreateIndex: true,
//  useFindAndModify: false,
    useUnifiedTopology: true,
  });


//module.exports.dropdb = async () => mongoose.connection.db.dropDatabase();
