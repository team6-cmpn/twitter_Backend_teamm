const User = require('../models/user.model');
const Tweet = require('../models/tweet.model');
const Relation = require('../models/relations.model');
const app = require("../../app");
const supertest = require('supertest');
const request = supertest(app);
var jwt  = require("jsonwebtoken");
const mongoose = require('mongoose');
const { createNewRelation} = require('../utils/user.js');
const { relations } = require('../models');
ObjectId = require('mongodb').ObjectId;

const relation1=new Relation({
    _id: ObjectId("62782caf69927ef7b0aaeeda"),
    user_id: ObjectId("62782caf69927ef7b0aaeede"),
      username: "admin2",
      name:  "Ahmed",
      following: false,
      follower: true,
      blocked: false,
      mute: false,
      all_replies: false,
      blocked_by: null,
      Notifications_enabled: false,
      created_at: new Date(),
});



const relation2=new Relation({
    _id:ObjectId("62782caf69927ef7b0eeeaaa"),
    user_id:ObjectId("62782caf69927ef7b0eeeaae"),
    username:"essamAhmed",
    name:"essam",
    following: true,
      follower: false,
      blocked: false,
      mute: true,
      all_replies: false,
      blocked_by: null,
      Notifications_enabled: false,
      created_at: new Date(),

})

const relation3=new Relation({
  _id: ObjectId("627e2caf699a7ef7b0aaeedb"),
  user_id: ObjectId("62782caf69927ef7b0aaeede"),
    username: "admin2",
    name:  "Ahmed",
    following: false,
    follower: false,
    blocked: false,
    mute: false,
    all_replies: false,
    blocked_by: true,
    Notifications_enabled: false,
    created_at: new Date(),
});

const relation4=new Relation({
  _id: ObjectId("6278277f67927af7b0aaeedb"),
  user_id: ObjectId("62782caf67777777b00aabbe"),
    username: "@ali",
    name:  "ali",
    following: false,
    follower: false,
    blocked: true,
    mute: false,
    all_replies: false,
    blocked_by: null,
    Notifications_enabled: false,
    created_at: new Date(),
});

const user1=new User({
        _id:ObjectId("62782caf69927ef7b0eeeaae"),
        name:"essam",
        username : "essamAhmed",
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
        confirmed : true,
        relations:[ObjectId("62782caf69927ef7b0aaeeda")]
    })
  
    const user2=new User({
        _id:ObjectId("62782caf69927ef7b0aaeede"),
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
        relations:[
          ObjectId("62782caf69927ef7b0eeeaaa"),
          ObjectId("6278277f67927af7b0aaeedb")
        ]
    })
  
    const user3=new User({
        _id:ObjectId("62782caf69927ef7b0ffeaae"),
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
        favorites:[ObjectId("62782caf69927ef7b0eeeeaf")]
    })
  
  
    const user4=new User({
        _id:ObjectId("62782caf69927ef7b0aaaaae"),
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
        _id:ObjectId("62782caf69927ef7ffffafae"),
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
        _id:ObjectId("62782caf69927ef7b00aabbe"),
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
    const user8=new User({
        _id:ObjectId("62782caf67777777b00aabbe"),
        name:"ali",
        username : "@ali",
        email : "ah@gm.com",
        password : "$2a$08$ffdhhefCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C",
        followers_count : 150,
        dateOfBirth :("2022-04-15T05:21:20.200Z"),
        relations:[ObjectId("627e2caf699a7ef7b0aaeedb")],
        admin_block : {
          blocked_by_admin : true,
          block_duration: 20,
        block_createdAt: ("2022-04-17T02:59:23.228Z")
      },
      isAdmin : false,
      created_at : ("2022-04-15T02:59:23.228Z"),
      confirmed : true})


    const user7=new User({
      //_id:ObjectId("62782caf69927ef7b0eeeaae"),
      name:"essam",
      username : "toBeDeleted",
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

  
  
  const tweetData = [
  
    {
      _id:ObjectId("62782caf69927ef7b0eeeeaf"),
      text : "oppo is the worst",
      retweet_count : 10,
      favorite_count : 10,
      created_at: "2020-04-14T12:58:49.514Z",
      hasImage:true,
      user:ObjectId("62782caf69927ef7ffffafae")
  },
  
  {
  text : "Beer is the worst",
  retweet_count : 10,
  favorite_count : 10,
    created_at: "2020-04-14T12:58:49.514Z",
  },
  
  {
  text : "pepsi is the worst",
  retweet_count : 10,
  favorite_count : 10,
    created_at: "2020-04-14T12:58:49.514Z",
    hasImage:false,
    user:ObjectId("62782caf69927ef7ffffafae")
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
            await user8.save()
            await  Tweet.insertMany(tweetData)
            await relation1.save()
            await relation2.save()
            await relation3.save()
            await relation4.save()
          //await mongoose.connection.dropDatabase();
       });
  
       afterAll(async () => {
          await mongoose.connection.db.dropDatabase();
           await mongoose.connection.close();
       })

describe('test the getting user APIs', () => {
    it('testing getting res 200 from userShow ', async() => {
        //const userID='625f470f5d3704cc532101db';
        const userObject= await User.findOne({username: 'mosalah'});
    const userID=userObject._id;
    // console.log(userObject);
    // console.log(userID);
        const res = await request.get('/user/show/'+userID);
      expect(res.status).toBe(200);
      expect(res.body.user._id).toBe(userObject._id.toString());
        expect(res.body.user.username).toBe(userObject.username);
        expect(res.body.user.email).toBe(userObject.email);
    })

    it('testing getting res 404 from userShow', async() => {
        //const userID='625f470f5d3704cc532101db';
        //const userObject= await User.findOne({username: 'mosalah'});
    const userID=ObjectId("62083caf59927ef7b0eeeeee");
    //await User.remove({_id: userID});
    // console.log(userObject);
    // console.log(userID);
        const res = await request.get('/user/show/'+userID);
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("User Not found.")
    })

    
  })


describe('test the user lookup API' , ()=>
{
    it('testing getting res 200 from userLookup', async() => {
      const user1=await User.findOne({username: 'mostafa'});
      const user2=await User.findOne({username: 'admin3'});
      userIds=user1._id.toString()+','+user2._id.toString();
        const res = await request.get('/user/lookup/'+userIds);
      expect(res.status).toBe(200);
      expect(res.body.user[0].username).toBe("mostafa");
      expect(res.body.user[0]._id.toString()).toBe(user1._id.toString());
      expect(res.body.user[1].username).toBe("admin3");
      expect(res.body.user[1]._id.toString()).toBe(user2._id.toString());
    })

    it('testing getting res 404 from userLookup', async() => {
      //const user1=await User.findOneAndRemove({username: 'mostafa'});
      //const user2=await User.findOneAndRemove({username: 'admin3'});
      userIds="1111,2222";
        const res = await request.get('/user/lookup/'+userIds);
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Users Not found.")
    })

})


describe('test make follow API', () => {
    it('testing create a relation ' , async() => {
        const signinUser = {
            data :"admin2",
            password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);
        token=response.body.accessToken;
        const userObject= await User.findOne({username: 'samy'});
        const userID=userObject._id;
        const res = await request.post('/friendships/create/'+userID).set("x-access-token",token);
        expect(res.status).toBe(200);
        expect(res.body.user_id.toString()).toBe(userID.toString());
    })

     it('testing create an exicting relation ' , async() => {
        const signinUser = {
            data :"admin2",
            password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);
        token=response.body.accessToken;
        const userObject= await User.findOne({username: 'essamAhmed'});
        const userID=userObject._id.toString();
        console.log(userID);
        //const res2 = await request.post('/friendships/create/'+userID).set("x-access-token",token);
        const res = await request.post('/friendships/create/'+userID).set("x-access-token",token);
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("the user is already following the user");
    })

    it('testing following exicting relation ' , async() => {
      const signinUser = {
          data :"essamAhmed",
          password: "$2afbg$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
      }
      const response = await request.post('/auth/signin')
      .send(signinUser);
      token=response.body.accessToken;
      const userObject= await User.findOne({username: 'admin2'});
      const userID=userObject._id;
    //   const newRelation = await createNewRelation(userObject);
    //   newRelation.following=false;
    //   newRelation.follower=false;
    //   await newRelation.save();
    // await User.updateOne({ _id :  response.body.user._id  }, { $push: { relations: newRelation._id } });
    //   const res2 = await request.post('/friendships/destroy/'+userID).set("x-access-token",token);
    //   // await Relation.updateOne({_id:res2.body._id},{$set:{following:false}});
      const res = await request.post('/friendships/create/'+userID).set("x-access-token",token);
      console.log(res.body)
      expect(res.status).toBe(200);
      expect(res.body.message).toBe("following");
      await Relation.updateOne({_id:relation1._id},{$set:{following:false}});
      await Relation.updateOne({_id:relation2._id},{$set:{follower:false}});
  })


})

describe('get the user following ids ', () => {
    it('testing get the user following ids ' , async() => {
        // const signinUser = {
        //     data :"admin2",
        //     password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
        // }
        // const response = await request.post('/auth/signin')
        // .send(signinUser);
        // token=response.body.accessToken;
        const userObject= await User.findOne({username: 'admin2'});
        const userObject2= await User.findOne({username: 'essamAhmed'});

        const userID=userObject._id;
        //const res2 = await request.post('/friendship/create'+userObject._id).set("x-access-token",token);
        const res = await request.get('/user/followingIDs/'+userID);
        expect(res.status).toBe(200);
        expect(res.body.following[0].toString()).toBe(userObject2._id.toString());
    })

    it ('testing get the user following ids when user is not following anyone' , async() => {
        // const signinUser = {
        //     data :"admin2",
        //     password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
        // }
        // const response = await request.post('/auth/signin')
        // .send(signinUser);
        // token=response.body.accessToken;
        const userObject= await User.findOne({username: 'samy'});
        const userID=userObject._id;
        const res = await request.get('/user/followingIDs/'+userID);
        expect(res.status).toBe(404);
        console.log(res.body)
        expect(res.body.following).toBe("user not found");

    })
})

describe('get the user follower ids ', () => {
    it('testing get the user follower ids ' , async() => {
        // const signinUser = {
        //     data :"admin2",
        //     password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
        // }
        // const response = await request.post('/auth/signin')
        // .send(signinUser);
        // token=response.body.accessToken;
        const userObject= await User.findOne({username: 'admin2'});
        const userObject2= await User.findOne({username: 'essamAhmed'});
        const userID=userObject._id;
        //const res2 = await request.post('/friendships/create/'+userObject._id).set("x-access-token",token);
        const res = await request.get('/user/followersIDs/'+userObject2._id);
        expect(res.status).toBe(200);
        expect(res.body.follower[0].toString()).toBe(userID.toString());
    })

    it ('testing get the user follower ids when user is not following anyone' , async() => {
        // const signinUser = {
        //     data :"admin2",
        //     password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
        // }
        // const response = await request.post('/auth/signin')
        // .send(signinUser);
        // token=response.body.accessToken;
        const userObject= await User.findOne({username: 'admin2'});
        const userID=userObject._id;
        const res = await request.get('/user/followersIDs/'+userID);
        expect(res.status).toBe(404);
        expect(res.body.follower).toBe("user not found");
      })
})


describe('get the user following list ', () => {
  it('testing get the user following list ' , async() => {
      // const signinUser = {
      //     data :"admin2",
      //     password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
      // }
      // const response = await request.post('/auth/signin')
      //.send(signinUser);
      //token=response.body.accessToken;
      const userObject= await User.findOne({username: 'admin2'});
        const userObject2= await User.findOne({username: 'essamAhmed'});
      const userID=userObject._id;
      //const res2 = await request.post('/friendship/create/'+userObject._id).set("x-access-token",token);
      const res = await request.get('/user/followingList/'+userID);
      expect(res.status).toBe(200);
      expect(res.body.following[0]._id.toString()).toBe(userObject2._id.toString());
  })

  it ('testing get the user following list when user is not following anyone' , async() => {
      // const signinUser = {
      //     data :"admin2",
      //     password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
      // }
      // const response = await request.post('/auth/signin')
      // .send(signinUser);
      // token=response.body.accessToken;
      const userObject= await User.findOne({username: 'samy'});
      const userID=userObject._id;
      const res = await request.get('/user/followingList/'+userID);
      expect(res.status).toBe(404);
      expect(res.body.following).toBe("user not found");

  })
})


describe('get the user follower list ', () => {
  it('testing get the user follower list ' , async() => {
      // const signinUser = {
      //     data :"admin2",
      //     password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
      // }
      // const response = await request.post('/auth/signin')
      // .send(signinUser);
      // token=response.body.accessToken;
      const userObject= await User.findOne({username: 'admin2'});
        const userObject2= await User.findOne({username: 'essamAhmed'});
        const userID=userObject._id;
      //const res2 = await request.post('/friendships/create/'+userObject._id).set("x-access-token",token);
      const res = await request.get('/user/followersList/'+userObject2._id);
      expect(res.status).toBe(200);
      expect(res.body.follower[0]._id.toString()).toBe(userID.toString());
  })

  it ('testing get the user follower ids when user is not following anyone' , async() => {
      // const signinUser = {
      //     data :"admin2",
      //     password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
      // }
      // const response = await request.post('/auth/signin')
      // .send(signinUser);
      // token=response.body.accessToken;
      const userObject= await User.findOne({username: 'admin2'});
        //const userObject2= await User.findOne({username: 'essamAhmed'});
        const userID=userObject._id;
      const res = await request.get('/user/followersIDs/'+userID);
      expect(res.status).toBe(404);
      expect(res.body.follower).toBe("user not found");
    })
})

describe ('get the user posts', () => {
  it('testing get the user posts ' , async() => {
      // const signinUser = {
      //     data :"admin2",
      //     password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
      // }
      // const response = await request.post('/auth/signin')
      // .send(signinUser);
      // token=response.body.accessToken;
      const userObject= await User.findOne({username: 'mostafa'});
      const userID=userObject._id;
      const res = await request.get('/user/tweetsList/'+userID);
      expect(res.status).toBe(200);
      expect(res.body[0].user.toString()).toBe(userID.toString());
  })

  it ('testing get the user posts when user has no posts' , async() => {
      // const signinUser = {
      //     data :"admin2",
      //     password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
      // }
      // const response = await request.post('/auth/signin')
      // .send(signinUser);
      // token=response.body.accessToken;
      //const userObject= await User.findOne({username: 'admin2'});
      const userID=ObjectId("123456789012345678901234");
      const res = await request.get('/user/tweetsList/'+userID);
      expect(res.status).toBe(404);
      expect(res.text).toBe("No user found");
    })


})

describe ('get the user likes', () => {
  it('testing get the user likes ' , async() => {
      // const signinUser = {
      //     data :"admin2",
      //     password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
      // }
      // const response = await request.post('/auth/signin')
      // .send(signinUser);
      // token=response.body.accessToken;
      const userObject= await User.findOne({username: 'admin3'});
      const userID=userObject._id;
      const res = await request.get('/user/likedTweetsList/'+userID);
      expect(res.status).toBe(200);
      expect(res.body.tweets[0]._id.toString()).toBe("62782caf69927ef7b0eeeeaf");
  })
  it ('testing get the user likes when user not exicted' , async() => {
      // const signinUser = {
      //     data :"admin2",
      //     password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
      // }
      // const response = await request.post('/auth/signin')
      // .send(signinUser);
      // token=response.body.accessToken;
      const userID=ObjectId("123456789012345678901234");
      const res = await request.get('/user/likedTweetsList/'+userID);
      expect(res.status).toBe(404);
      expect(res.body.tweets).toBe("No user found");
    })
})

describe('get the tweets with media' , () => {
  it('testing get the tweets with media ' , async() => {
      // const signinUser = {
      //     data :"admin2",
      //     password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
      // }
      // const response = await request.post('/auth/signin')
      // .send(signinUser);
      // token=response.body.accessToken;
      const userObject= await User.findOne({username: 'mostafa'});
      const userID=userObject._id;
      const res = await request.get('/user/mediaList/'+userID);
      expect(res.status).toBe(200);
      expect(res.body.tweets[0]._id.toString()).toBe("62782caf69927ef7b0eeeeaf");
  })
  it ('testing get the tweets with media when user not exicted' , async() => {
      // const signinUser = {
      //     data :"admin2",
      //     password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
      // }
      // const response = await request.post('/auth/signin')
      // .send(signinUser);
      // token=response.body.accessToken;
      const userID=ObjectId("123456789012345678901234");
      const res = await request.get('/user/mediaList/'+userID);
      expect(res.status).toBe(404);
      expect(res.body.tweets).toBe("No user found");
    })
})
describe('test get mute user IDs' , () => {
  it('testing get mute user IDs ' , async() => {
      // const signinUser = {
      //     data :"admin2",
      //     password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
      // }
      // const response = await request.post('/auth/signin')
      // .send(signinUser);
      // token=response.body.accessToken;
      const userObject= await User.findOne({username: 'admin2'});
      const userObject2= await User.findOne({username: 'essamAhmed'});
      const userID=userObject._id;
      const res = await request.get('/user/mutedIDs/'+userID);
      expect(res.status).toBe(200);
      expect(res.body.muted[0].toString()).toBe(userObject2._id.toString());
  })
  it ('testing get mute user IDs when user not exicted' , async() => {
      // const signinUser = {
      //     data :"admin2",
      //     password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
      // }
      // const response = await request.post('/auth/signin')
      // .send(signinUser);
      // token=response.body.accessToken;
      const userID="1c2rt3";
      const res = await request.get('/user/mutedIDs/'+userID);
      expect(res.status).toBe(404);
      expect(res.body.muted).toBe("user not found");

    })
})

describe('test get muted user List' , () => {
  it('testing get mute users List ' , async() => {
    // const signinUser = {
    //     data :"admin2",
    //     password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
    // }
    // const response = await request.post('/auth/signin')
    // .send(signinUser);
    // token=response.body.accessToken;
    const userObject= await User.findOne({username: 'admin2'});
    const userObject2= await User.findOne({username: 'essamAhmed'});
    const userID=userObject._id;
    const res = await request.get('/user/mutedList/'+userID);
    expect(res.status).toBe(200);
    console.log(res.body.muted[0]);
    expect(res.body.muted[0]._id.toString()).toBe(userObject2._id.toString());
})
it ('testing get mute users List when user not exicted' , async() => {
    // const signinUser = {
    //     data :"admin2",
    //     password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
    // }
    // const response = await request.post('/auth/signin')
    // .send(signinUser);
    // token=response.body.accessToken;
    const userID="1c2rt3";
    const res = await request.get('/user/mutedList/'+userID);
    expect(res.status).toBe(404);
    expect(res.body.muted).toBe("user not found");

  })
})
describe ('test mute user' , () => {
  it('testing mute user' , async() => {
    const signinUser = {
        data :"essamAhmed",
        password: "$2afbg$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
    }
    const response = await request.post('/auth/signin')
    .send(signinUser);
    token=response.body.accessToken;
    const userObject= await User.findOne({username: 'admin2'});
    const userID=userObject._id;
    const res = await request.post('/friendships/mute/'+userID).set("x-access-token",token);;
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("muted");
    await Relation.updateOne({_id:relation1._id},{$set:{mute:false}});
})
it ('testing mute user when user is muted' , async() => {
  const signinUser = {
        data :"admin2",
        password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
    }
    const response = await request.post('/auth/signin')
    .send(signinUser);
    token=response.body.accessToken;
    const userObject= await User.findOne({username: 'essamAhmed'});
    const userID=userObject._id;
    const res = await request.post('/friendships/mute/'+userID).set("x-access-token",token);;
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("the user is already muting the user");
})
it ('testing mute user when there is no relation' , async() => {
  const signinUser = {
    data :"essamAhmed",
    password: "$2afbg$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
    }
    const response = await request.post('/auth/signin')
    .send(signinUser);
    token=response.body.accessToken;
    const userObject= await User.findOne({username: 'mostafa'});
    const userID=userObject._id;
    const res = await request.post('/friendships/mute/'+userID).set("x-access-token",token);;
    expect(res.status).toBe(200);
    expect(res.body._id.toString()).toBe(userID.toString());

})
})
describe ('test unmute user' , () => {
  it('testing unmute user' , async() => {
    const signinUser = {
        data :"essamAhmed",
        password: "$2afbg$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
    }
    const response = await request.post('/auth/signin')
    .send(signinUser);
    token=response.body.accessToken;
    const userObject= await User.findOne({username: 'admin2'});
    const userID=userObject._id;
    const res = await request.post('/friendships/unmute/'+userID).set("x-access-token",token);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("the user is already not muting the user");
  })
  it('testing unmute user' , async() => {
    const signinUser = {
        data :"admin2",
        password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
    }
    const response = await request.post('/auth/signin')
    .send(signinUser);
    token=response.body.accessToken;
    const userObject= await User.findOne({username: 'essamAhmed'});
    const userID=userObject._id;
    const res = await request.post('/friendships/unmute/'+userID).set("x-access-token",token);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("un muted");
    await Relation.updateOne({_id:relation2._id},{$set:{mute:true}});
})
it('testing unmute user when there is no relation' , async() => {
  const signinUser = {
    data :"essamAhmed",
    password: "$2afbg$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
    }
    const response = await request.post('/auth/signin')
    .send(signinUser);
    token=response.body.accessToken;
    const userObject= await User.findOne({username: 'mosalah'});
    const userID=userObject._id;
    const res = await request.post('/friendships/unmute/'+userID).set("x-access-token",token);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("there is no relation between the users");
  })
})

describe('test update profile', () => {
  it('testing update profile', async() => {
    const signinUser = {
        data :"admin3",
        password: "$2pv$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
    }
    const response = await request.post('/auth/signin')
    .send(signinUser);
    token=response.body.accessToken;
    // const userObject= await User.findOne({username: 'admin2'});
    // const userID=userObject._id;
    const res = await request.post('/user/update').set("x-access-token",token)
    .send({
      name:"se7s",
      description:"sehaimy number 1",
    });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("profile updated");
    const userObject= await User.findOne({username: 'admin3'});
    expect(userObject.name).toBe("se7s");
    expect(userObject.description).toBe("sehaimy number 1");
  })
  it('testing update profile when there is no token', async() => {
    const signinUser = {
        data :"toBeDeleted",
        password: "$2afbg$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
    }
    const response = await request.post('/auth/signin')
    .send(signinUser);
    token=response.body.accessToken;
    // const userObject= await User.findOne({username: 'admin2'});
    // const userID=userObject._id;
    await User.deleteOne({username: 'toBeDeleted'});
    const res = await request.post('/user/update').set("x-access-token",token)
    .send({
      name:"se7s",
      description:"sehaimy number 1",
    });
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("No user found");
    //await user7.save();
  })
})

describe ('test change username', () => {
  it('testing change username', async() => {
    const signinUser = {
        data :"admin3",
        password: "$2pv$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
    }
    const response = await request.post('/auth/signin')
    .send(signinUser);
    token=response.body.accessToken;
    const res = await request.post('/user/changeUsername').set("x-access-token",token)
    .send({
      username:"@sehaimy",
    });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Username changed successfully!");
    const userObject= await User.findOne({username: '@sehaimy'});
    expect(userObject.username).toBe("@sehaimy");
    await User.updateOne({username: '@sehaimy'},{$set:{username: 'admin3'}});
  })
  it ('testing change username to excting one', async() => {
    const signinUser = {
        data :"admin3",
        password: "$2pv$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
    }
    const response = await request.post('/auth/signin')
    .send(signinUser);
    token=response.body.accessToken;
    const res = await request.post('/user/changeUsername').set("x-access-token",token)
    .send({
      username:"@ali",
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Username already taken");
  })
})

describe ('test change Email', () => {
  it('testing change Email', async() => {
    const signinUser = {
        data :"admin3",
        password: "$2pv$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
    }
    const response = await request.post('/auth/signin')
    .send(signinUser);
    token=response.body.accessToken;
    const res = await request.post('/user/changeemail').set("x-access-token",token)
    .send({
      email:"sehaimy@gmail.com",
    });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Email changed successfully!");
    const userObject= await User.findOne({username: 'admin3'});
    expect(userObject.email).toBe("sehaimy@gmail.com");
  })
  it ('testing change Email to excting one', async() => {
    const signinUser = {
        data :"admin3",
        password: "$2pv$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
    }
    const response = await request.post('/auth/signin')
    .send(signinUser);
    token=response.body.accessToken;
    const res = await request.post('/user/changeemail').set("x-access-token",token)
    .send({
      email:"ah@gm.com",
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("email already taken");
  })
})
describe ('test change phone number', () => {
  it('testing change phone number', async() => {
    const signinUser = {
        data :"admin3",
        password: "$2pv$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
    }
    const response = await request.post('/auth/signin')
    .send(signinUser);
    token=response.body.accessToken;
    const res = await request.post('/user/changePhoneNumber').set("x-access-token",token)
    .send({
      phone_number:"01234567890",
    });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("phone number changed");
    const userObject= await User.findOne({username: 'admin3'});
    expect(userObject.phoneNumber).toBe("01234567890");
  })
})
describe ('test friendship destory', () => {
  it('testing friendship destory with no relations', async() => {
    const signinUser = {
        data :"admin3",
        password: "$2pv$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
    }
    const response = await request.post('/auth/signin')
    .send(signinUser);
    token=response.body.accessToken;
    const userObject= await User.findOne({username: 'admin2'});
    const res = await request.post('/friendships/destroy/'+userObject._id).set("x-access-token",token)
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("No relations");
  })
  it('testing friendship destory ', async() => {
    const signinUser = {
        data :"admin2",
        password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
    }
    const response = await request.post('/auth/signin')
    .send(signinUser);
    token=response.body.accessToken;
    const userObject= await User.findOne({username: 'essamAhmed'});
    const res = await request.post('/friendships/destroy/'+userObject._id).set("x-access-token",token)
    expect(res.status).toBe(200);
    expect(res.body._id.toString()).toBe(userObject._id.toString());
    await Relation.updateOne({_id:relation1._id},{$set:{follower:true}});
    await Relation.updateOne({_id:relation2._id},{$set:{following:true}});
  })
  it ('testing friendship destory without following and there is a relation', async() => {
    const signinUser = {
        data :"essamAhmed",
        password: "$2afbg$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
    }
    const response = await request.post('/auth/signin')
    .send(signinUser);
    token=response.body.accessToken;
    const userObject= await User.findOne({username: 'admin2'});
    const res = await request.post('/friendships/destroy/'+userObject._id).set("x-access-token",token)
    expect(res.status).toBe(403);
    expect(res.body.message).toBe("the user is not following the user");

    
  })

})
    









describe('post block the user',()=>
{
    it('testing block the user',async()=>{
        const signinUser = {
            data :"admin2",
            password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);
        token=response.body.accessToken;
        const userObject= await User.findOne({username: 'essamAhmed'});
        const userID=response.body.user._id;
        //const res2 = await request.post('/friendships/create/'+userObject._id).set("x-access-token",token);
        const res = await request.post('/friendships/block/'+userObject._id).set("x-access-token",token);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("blocked");
        await Relation.updateOne({_id:relation1._id},{$set:{blocked:false}});
        await Relation.updateOne({_id:relation1._id},{$set:{blocked_by:false}});
        await Relation.updateOne({_id:relation2._id},{$set:{blocked_by:false}});
        await Relation.updateOne({_id:relation2._id},{$set:{blocked:false}});
        await Relation.updateOne({_id:relation1._id},{$set:{follower:true}});
        await Relation.updateOne({_id:relation2._id},{$set:{following:true}});

    })

    it('testing block the user when user is not following anyone',async()=>{
        const signinUser = {
            data :"essamAhmed",
            password: "$2afbg$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);
        token=response.body.accessToken;
        const userObject= await User.findOne({username: 'samy'});
        const res = await request.post('/friendships/block/'+userObject._id).set("x-access-token",token);
        expect(res.status).toBe(200);
        expect(res.body._id.toString()).toBe(userObject._id.toString());
    })

    it('testing block the user aleady blocked',async()=>{
      const signinUser = {
        data :"admin2",
        password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
      }
      const response = await request.post('/auth/signin')
      .send(signinUser);
      token=response.body.accessToken;
      const userObject= await User.findOne({username: '@ali'});
      const res = await request.post('/friendships/block/'+userObject._id).set("x-access-token",token);
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("the user is already blocking the user");
    })
})

describe( 'get the blocked users IDS' , () => {
  it('testing get the blocked users',async()=>{
      const userObject= await User.findOne({username: 'admin2'});
      const targetUser= await User.findOne({username: '@ali'});
      const res = await request.get('/user/blockedIDs/'+userObject._id);
      expect(res.status).toBe(200);
      expect(res.body.blocks[0].toString()).toBe(targetUser._id.toString());
})
it('testing get the blocked users when user is not blocking anyone',async()=>{
    const userObject= 1212;
    const res = await request.get('/user/blockedIDs/'+userObject);
    expect(res.status).toBe(404);
    expect(res.body.blocks).toBe("user not found");
})
})

describe('get the blocked users',()=>
{
    it('testing get the blocked users',async()=>{
        const userObject= await User.findOne({username: 'admin2'});
        const targetUser= await User.findOne({username: '@ali'});
        const res = await request.get('/user/blockedList/'+userObject._id);
        expect(res.status).toBe(200);
        expect(res.body.blocks[0]._id.toString()).toBe(targetUser._id.toString());
    })
    it('testing get the blocked users when user is not blocking anyone',async()=>{
        const userObject= 1212;
        const res = await request.get('/user/blockedList/'+userObject);
        expect(res.status).toBe(404);
        expect(res.body.blocks).toBe("user not found");
    })
})

describe('test unblock user',()=>
{
    it('testing unblock user',async()=>{
        const signinUser = {
            data :"admin2",
            password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);
        token=response.body.accessToken;
        const userObject= await User.findOne({username: '@ali'});
        const res = await request.post('/friendships/unblock/'+userObject._id).set("x-access-token",token);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("un blocked");
    })
    it('testing unblock user when user is not blocking anyone',async()=>{
        const signinUser = {
          data :"admin2",
          password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);
        token=response.body.accessToken;
        const userObject= await User.findOne({username: 'mosalah'});
        const res = await request.post('/friendships/unblock/'+userObject._id).set("x-access-token",token);
        expect(res.status).toBe(400);
        expect(res.text).toBe("there is no relation between the users");
    })
    it('testing unblock user when user is not blocking anyone',async()=>{
        const signinUser = {
          data :"admin2",
          password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);
        token=response.body.accessToken;
        const userObject= await User.findOne({username: 'essamAhmed'});
        const res = await request.post('/friendships/unblock/'+userObject._id).set("x-access-token",token);
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("the user is already not blocking the user");
    })
})
