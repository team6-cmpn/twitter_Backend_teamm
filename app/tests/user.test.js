const User = require('../models/user.model');
const Tweet = require('../models/tweet.model');
const app = require("../../app");
const supertest = require('supertest');
const request = supertest(app);
var jwt  = require("jsonwebtoken");
const mongoose = require('mongoose');


const user1=new User(
    {
  
        username : "essam ahmed",
        email : "bcq34@frjidffooq.com",
        password : "$2afbg$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C",
        followers : [],
        followers_count : 150,
        dateOfBirth :"1975-05-02 00:20:19.197Z",
        following : [],
        admin_block : {
            "blocked_by_admin" : false
        },
        isAdmin : false,
        confirmed : true
    })
  
    const user2=new User({
        name : "Ahmed",
        username : "admin2",
        email : "bcq34@jidffooq.com",
        password : "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C",
        followers : [],
        followers_count : 150,
        dateOfBirth :("2022-04-15T05:21:20.200Z"),
        following : [],
        following_count : 12,
        admin_block : {
            "blocked_by_admin" : false
        },
        isAdmin : true,
        created_at : ("2022-04-15T02:59:23.228Z"),
        confirmed : true,
    })
  
    const user3=new User({
  
        username : "admin3",
        email : "brcq34@jidffooq.com",
        password : "$2pv$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C",
        followers : [],
        followers_count : 150,
        dateOfBirth :("2022-04-15T05:21:20.200Z"),
        following : [],
        admin_block : {
            "blocked_by_admin" : false
        },
        isAdmin : true,
        created_at : ("2022-04-15T02:59:23.228Z"),
        confirmed : true,
    })
  
  
    const user4=new User({
  
        username : "mosalah",
        email : "bcq34@rrjidffooq.com",
        password : "$2a$08$dhhefCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C",
        followers : [],
        followers_count : 150,
        dateOfBirth :("2022-04-15T05:21:20.200Z"),
        following : [],
        admin_block : {
            blocked_by_admin : true,
            block_duration: 2,
          block_createdAt: ("2022-04-17T02:59:23.228Z")
        },
        isAdmin : false,
        created_at : ("2022-04-15T02:59:23.228Z"),
        confirmed : true,
    })
  
    const user5=new User({
  
        username : "mostafa",
        email : "bcq34@rrjidffaaooq.com",
        password : "$aa2a$08$dhhefCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C",
        followers : [],
        followers_count : 150,
        dateOfBirth :("2022-04-15T05:21:20.200Z"),
        following : [],
        admin_block : {
            blocked_by_admin : false
        },
        isAdmin : false,
        created_at : ("2022-04-15T02:59:23.228Z"),
        confirmed : true,
    })
  
    const user6=new User({
  
        username : "samy",
        email : "bcq34@rrjidfqqfooq.com",
        password : "$2a$08$ffdhhefCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C",
        followers : [],
        followers_count : 150,
        dateOfBirth :("2022-04-15T05:21:20.200Z"),
        following : [],
        admin_block : {
            blocked_by_admin : true,
            block_duration: 20,
          block_createdAt: ("2022-04-17T02:59:23.228Z")
        },
        isAdmin : false,
        created_at : ("2022-04-15T02:59:23.228Z"),
        confirmed : true,
    })
  
  
  const tweetData = [
  
    {
      text : "oppo is the worst",
      retweet_count : 10,
      favorite_count : 10,
      created_at: "2020-04-14T12:58:49.514Z"
  },
  
  {
  text : "Beer is the worst",
  retweet_count : 10,
  favorite_count : 10,
    created_at: "2020-04-14T12:58:49.514Z"
  },
  
  {
  text : "pepsi is the worst",
  retweet_count : 10,
  favorite_count : 10,
    created_at: "2020-04-14T12:58:49.514Z"
  }];
  
  
  
  beforeAll(async () => {
          const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
          await mongoose.connect(url,
              {
                  useNewUrlParser: true,
                  useUnifiedTopology: true
              });
          //  await   User.insertMany(userData)
        await  user1.save()
          await user2.save()
            await user3.save()
            await user4.save()
            await user5.save()
              await user6.save()
            await  Tweet.insertMany(tweetData)
          //await mongoose.connection.dropDatabase();
       });
  
       afterAll(async () => {
          await mongoose.connection.db.dropDatabase();
           await mongoose.connection.close();
       })

describe('test the getting user APIs', () => {
    const userObject= User.findOne({username: 'Zell'});
    const userID=userObject._id;

    it('should test that the user show is working', async() => {
        const res = await request.post('/user/show')
        .send({
            id : "625f470f5d3704cc532101db"
        })
      expect(res.status).toBe(200);
      expect(res.user).toBe(userObject)
    })
  })