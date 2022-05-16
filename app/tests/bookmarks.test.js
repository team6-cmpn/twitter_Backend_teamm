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
  
  
    const user7=new User({
        _id:"627807a1c0308cfe5e02969b",
        username : "passwordTest", 
        email : "ahmedelsherkawy205@gmail.com", 
        savedText : [
    
        ], 
        savedUsers : [
    
        ], 
        bookMarks : [
            {
                _id: '625de6efa88f0b646b718dab',
                text: '7mada @testy',
                source: '<a href="http://twitter.com" rel="nofollow">Twitter Web Client</a>',
                truncated: false,
                hasImage: false,
                favorites: [],
                retweetUsers: [],
                __v: 0
              }
        ], 
        password : "$2a$08$Yq79392..fpyw2PHuULuqeHcNpZ/0wAjgMNkf4yVPFBxlS5CQ8qDm", 
        followers : [
    
        ], 
        following : [
    
        ], 
        created_at : "2022-05-08T18:10:41.093+0000", 
        confirmed : true, 
        admin_block : {
            "blocked_by_admin" : false
        }, 
        isAdmin : false, 
        favorites : [
    
        ], 
        isDeactivated : false, 
        verificationCode : "133306", 
        __v : 0,
        name : "7mada"
    })
  const tweetData = [
  
    {
      text : "oppo is the worst",
      retweet_count : 10,
      favorite_count : 10,
      created_at: "2020-04-14T12:58:49.514Z",
      hasImage: false
  },
  
  {
  text : "Beer is the worst",
  retweet_count : 10,
  favorite_count : 10,
    created_at: "2020-04-14T12:58:49.514Z",
    hasImage: true
  },
  {
    
        _id: "625de6efa88f0b646b718dad",
        created_at: "2020-02-17T23:05:00.000Z",
        text: "7mada @testy",
        source: "<a href=\"http://twitter.com\" rel=\"nofollow\">Twitter Web Client</a>",
        truncated: false,
        hasImage: false

  },
  
  {
      
  text : "pepsi is the worst",
  retweet_count : 10,
  favorite_count : 10,
    created_at: "2020-04-14T12:58:49.514Z",
    hasImage: true
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
              await user7.save()
            await  Tweet.insertMany(tweetData)
          //await mongoose.connection.dropDatabase();
       });
  
       afterAll(async () => {
          await mongoose.connection.db.dropDatabase();
           await mongoose.connection.close();
       })
  
  
  




describe('add to bookmarks test', () => {
    it('should add to bookmarks', async () => { 
        const signinUser = {
            data :"passwordTest",
            password: "$2a$08$Yq79392..fpyw2PHuULuqeHcNpZ/0wAjgMNkf4yVPFBxlS5CQ8qDm"
        }
        const response = await request.post('/auth/signin').send(signinUser);
        token=response.body.accessToken;

        const id='625de6efa88f0b646b718dad';
        const res = await request.put('/bookmarks/add/'+id).set("x-access-token",token);
        expect(res.status).toBe(200);
           
    });

    it ('should not add to bookmarks already added', async () => { 
        const signinUser = {
          data :"passwordTest",
         password: "$2a$08$Yq79392..fpyw2PHuULuqeHcNpZ/0wAjgMNkf4yVPFBxlS5CQ8qDm"
        }
        const response = await request.post('/auth/signin').send(signinUser);
        token=response.body.accessToken;
         id2 ='625de6efa88f0b646b718dad';
        const res = await request.put('/bookmarks/add/'+id2).set("x-access-token",token);
        const resp = await request.put('/bookmarks/add/'+id2).set("x-access-token",token);
       // await User.findOneAndDelete({ bookMarks: "625de6efa88f0b646b718dad" })
        expect(resp.status).toBe(400);
        expect(resp.body.message).toBe("already saved");
             
        

    });
});
describe ('get bookmarks test', () => { 
    it ('should get bookmarks', async () => { 
        const signinUser = {
            data :"passwordTest",
            password: "$2a$08$Yq79392..fpyw2PHuULuqeHcNpZ/0wAjgMNkf4yVPFBxlS5CQ8qDm"
        }
        const response = await request.post('/auth/signin').send(signinUser);
        token=response.body.accessToken;
        const res = await request.get('/bookmarks/get').set("x-access-token",token);
        expect(res.status).toBe(200);
        //expect(res.body.message).toBe("bookmarks");
    });
});
describe ('remove all bookmarks test', () => { 
    it ('should remove all from bookmarks', async () => { 
        const signinUser = {
            data :"passwordTest",
            password: "$2a$08$Yq79392..fpyw2PHuULuqeHcNpZ/0wAjgMNkf4yVPFBxlS5CQ8qDm"
        }
        const response = await request.post('/auth/signin').send(signinUser);
        token=response.body.accessToken;
        const res = await request.delete('/bookmarks/removeAll').set("x-access-token",token);
        expect(res.status).toBe(200);
        //expect(res.body.message).toBe("Tweet removed from bookmarks");
    
    });
});
describe ('remove from bookmarks test', () => { 
    it ('should remove from bookmarks', async () => { 
        const signinUser = {
            data :"passwordTest",
            password: "$2a$08$Yq79392..fpyw2PHuULuqeHcNpZ/0wAjgMNkf4yVPFBxlS5CQ8qDm"
        }
        const response = await request.post('/auth/signin').send(signinUser);
        token=response.body.accessToken;
        const id='625de6efa88f0b646b718dad'
        const res = await request.delete('/bookmarks/remove/'+id).set("x-access-token",token);
        expect(res.status).toBe(200);
        //expect(res.body.message).toBe("Tweet removed from bookmarks");
    });
});