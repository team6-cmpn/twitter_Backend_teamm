require("dotenv").config();
const User = require("./app/seeders/User.seeder");
const Relation = require("./app/seeders/Relation.seeder");
//console.log(User);
//console.log("love is way");
const db = require("./app/models");
const mongoose = require('mongoose');


const mongoURL = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}` || 'mongodb://localhost:27017/Twitter_db';






module.exports.seedersList = {Relation, User};



module.exports.connect = async () =>

await mongoose.connect('mongodb://localhost:27017/Twitter_db', {
    useNewUrlParser: true,
  //  useCreateIndex: true,
//  useFindAndModify: false,
    useUnifiedTopology: true,
  });


//module.exports.dropdb = async () => mongoose.connection.db.dropDatabase();
