//const { seedDatabase } = require('./seeds')
//require("dotenv").config();
const mongoose = require('mongoose');
const User = require('../models/user.model');
//const db = require("../models");
//mongoose.set('useCreateIndex', true)
//mongoose.promise = global.Promise

// async function removeAllCollections () {
//   const collections = Object.keys(mongoose.connection.collections)
//   for (const collectionName of collections) {
//     const collection = mongoose.connection.collections[collectionName]
//     await collection.deleteMany()
//   }
// }
async function removeAllCollections () {
    const db = mongoose.connection.db;
    // Get all collections
    const collections = await db.listCollections().toArray();
    // Create an array of collection names and drop each collection
    collections
      .map((collection) => collection.name)
      .forEach(async (collectionName) => {
         // collectionName.deleteMany();
        db.dropCollection(collectionName);
      });
}

async function insertUsers() {
    const data = [{
        username: 'Zell',
        email: 'testing@gmail.com',
        password: '12345678',
        confirmed: true
    }, {
        username: 'Zell2',
        email: 'testing2@gmail.com',
        password: '12345678'
    }, {
        username: 'Zell3',
        email: 'testing3@gmail.com',
        password: '1234567',
        confirmed: true
    },
    {
        username: 'Zellconfirm',
        email: 'testingconfirm@gmail.com',
        password: '12345678',
        confirmed: false
    },
    {
      googleId :"111",
      username: "coco",
      email: "req.coco.ejknj5maill"
    }
  ];
    //await User(data).save();
    await  User.insertMany(data , (err, docs) => {
      //console.log(docs);
    });
}
async function dropAllCollections () {
  const collections = Object.keys(mongoose.connection.collections)
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName]
    try {
      await collection.drop()
    } catch (error) {
      // Sometimes this error happens, but you can safely ignore it
      if (error.message === 'ns not found') return
      // This error occurs when you use it.todo. You can
      // safely ignore this error too
      if (error.message.includes('a background operation is currently running')) return
      console.log(error.message)
    }
  }
}

module.exports = {
  setupDB (databaseName, runSaveMiddleware = false) {
    // Connect to Mongoose
    beforeAll(async () => {
      //await dropAllCollections()
      //await mongoose.connection.close()
      const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
      await mongoose.connect(url, { useNewUrlParser: true })
      await insertUsers();

    })
    
    // Seeds database before each test
    // beforeEach(async () => {
      //   await seedDatabase(runSaveMiddleware)
      // })
      
      // Cleans up database between each test
    //   beforeEach(async () => {
    //     const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    //     await mongoose.connect(url, {useNewUrlParser: true,
    //       useCreateIndex: true,
    //       useFindAndModify: false,
    //       useUnifiedTopology: true, })
    //     await mongoose.connection.dropDatabase();
    //     //await User.deleteMany();
    //     await insertData();
    // })

    // beforeEach(async () => {
    //     const collections = Object.keys(mongoose.connection.collections)
    //     for (const collectionName of collections) {
    //       const collection = mongoose.connection.collections[collectionName]
    //       await collection.deleteMany()
    //     }
    //     // User.insertMany([ ... ], (err, docs) => {
            
    //     //   });
    //   });

    // Disconnect Mongoose
    // afterAll(async () => {
    //   await dropAllCollections()
    //   await mongoose.connection.close()
    // })
  }
}