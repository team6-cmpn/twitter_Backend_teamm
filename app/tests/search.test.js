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
  
        username : "admin2",
        email : "bcq34@jidffooq.com",
        password : "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C",
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
  
  
  









//setupDB('Twitter_db_test', true);

// describe('search people test', () => {
//     it('Should search for people in database', async () => {
//         const res = await request.get('/search/people').query({ text: '@essam ahmed'});

//                  expect(res.status).toBe(200);
//                  expect(res.body.usernames[0].username).toBe('essam ahmed');
//                  expect(res.body.message).toBe('okay!');
            
//       });

    
//     it('Should give 404 search not found', async () => {
//         const res = await request.get('/search/people').query({ text: 'mosalnffnvah'});
          
//         //await User.find({ username : '3osajaahshngh'})
//         //.exec((err, user) => {
//             expect(res.status).toBe(404);
//             expect(res.body.message).toBe("Failed! name or user name not found");
//         //});
//     });

// });


// describe('search tweet test', () => {
//   it('Should search for tweettext in database', async () => {
//       const res = await request.get('/search/Latest')
//           .query({
//           text : 'oppo'
//           });            
//           // Searches the user in the database
//       await Tweet.find({ text : 'oppo is the worst @oppo'})
//           .exec((err, tweet) => {
//                 expect(res.status).toBe(200);
//                 expect(res.body.message).toBe('okay!');
//                 expect(res.body.tweets.text).toBe(tweet.text);
          
//       });

//   });
//   it('Should give 404 search not found', async () => {
//       const res = await request.get('/search/Latest')
//           .send({
//           text : '08042802840284'
//           });
//           expect(res.status).toBe(404);
//           expect(res.body.message).toBe("Failed! tweet text not found");

//     });
// });


// describe('search top test', () => {
//     it('Should search for people , tweets,mentions in database', async () => {
//         const res = await request.get('/search/top').query({ text: '@essam ahmed'});

//                  expect(res.status).toBe(200);
//                  expect(res.body.usernames[0].username).toBe('essam ahmed');
//                  expect(res.body.message).toBe('okay!');
            
//       });

//       it('Should search for people , tweets,mentions in database', async () => {
//         const res = await request.get('/search/top')
//         .query({
//             text : 'oppo'
//             });            
//             // Searches the user in the database
//         await Tweet.find({ text : 'oppo is the worst @oppo'})
//             .exec((err, tweet) => {
//                   expect(res.status).toBe(200);
//                   expect(res.body.message).toBe('okay!');
//                   expect(res.body.tweets.text).toBe(tweet.text);
            
//         });
            
//       });    
    // it('Should give 404 search not found', async () => {
    //     const res = await request.get('/search/people').query({ text: 'mosalnffnvah'});
          
    //     //await User.find({ username : '3osajaahshngh'})
    //     //.exec((err, user) => {
    //         expect(res.status).toBe(404);
    //         expect(res.body.message).toBe("Failed! name or user name not found");
    //     //});
    // });

//});


