const User = require('../models/user.model');
const Tweet = require('../models/tweet.model');
const Relation = require('../models/relations.model');
const app = require("../../app");
const supertest = require('supertest');
const request = supertest(app);
var jwt  = require("jsonwebtoken");
const mongoose = require('mongoose');
const { createNewRelation} = require('../utils/user.js')


const user1=new User({
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
        const userObject= await User.findOne({username: 'mosalah'});
    const userID=userObject._id;
    await User.remove({_id: userID});
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
      const user1=await User.findOneAndRemove({username: 'mostafa'});
      const user2=await User.findOneAndRemove({username: 'admin3'});
      userIds=user1._id.toString()+','+user2._id.toString();
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
        const userObject= await User.findOne({username: 'samy'});
        const userID=userObject._id;

        const res2 = await request.post('/friendships/create/'+userID).set("x-access-token",token);
        const res = await request.post('/friendships/create/'+userID).set("x-access-token",token);
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("the user is already following the user");
    })

    it('testing following exicting relation ' , async() => {
      const signinUser = {
          data :"admin2",
          password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
      }
      const response = await request.post('/auth/signin')
      .send(signinUser);
      token=response.body.accessToken;
      const userObject= await User.findOne({username: 'samy'});
      const userID=userObject._id;
      const newRelation = await createNewRelation(userObject);
      newRelation.following=false;
      newRelation.follower=false;
      await newRelation.save();
    await User.updateOne({ _id :  response.body.user._id  }, { $push: { relations: newRelation._id } });
      const res2 = await request.post('/friendships/destroy/'+userID).set("x-access-token",token);
      // await Relation.updateOne({_id:res2.body._id},{$set:{following:false}});
      const res = await request.post('/friendships/create/'+userID).set("x-access-token",token);
      console.log(res.body)
      expect(res.status).toBe(200);
      expect(res.body.message).toBe("following");
  })


})

describe('get the user following ids ', () => {
    it('testing get the user following ids ' , async() => {
        const signinUser = {
            data :"admin2",
            password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);
        token=response.body.accessToken;
        const userObject= await User.findOne({username: 'samy'});
        const userID=response.body.user._id;
        const res2 = await request.post('/friendship/create'+userObject._id).set("x-access-token",token);
        const res = await request.get('/user/followingIDs/'+userID);
        expect(res.status).toBe(200);
        expect(res.body.following[0].toString()).toBe(userObject._id.toString());
    })

    it ('testing get the user following ids when user is not following anyone' , async() => {
        const signinUser = {
            data :"admin2",
            password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);
        token=response.body.accessToken;
        const userObject= await User.findOne({username: 'samy'});
        const userID=userObject;
        const res = await request.get('/user/followingIDs/'+userID);
        expect(res.status).toBe(404);
        expect(res.body.following).toBe("user not found");

    })
})

describe('get the user follower ids ', () => {
    it('testing get the user follower ids ' , async() => {
        const signinUser = {
            data :"admin2",
            password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);
        token=response.body.accessToken;
        const userObject= await User.findOne({username: 'samy'});
        const userID=response.body.user._id;
        const res2 = await request.post('/friendships/create/'+userObject._id).set("x-access-token",token);
        const res = await request.get('/user/followersIDs/'+userObject._id);
        expect(res.status).toBe(200);
        expect(res.body.follower[0].toString()).toBe(userID.toString());
    })

    it ('testing get the user follower ids when user is not following anyone' , async() => {
        const signinUser = {
            data :"admin2",
            password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);
        token=response.body.accessToken;
        const userObject= await User.findOne({username: 'samy'});
        const userID=response.body.user._id;
        const res = await request.get('/user/followersIDs/'+userID);
        expect(res.status).toBe(404);
        expect(res.body.follower).toBe("user not found");
      })
})


describe('get the user following list ', () => {
  it('testing get the user following list ' , async() => {
      const signinUser = {
          data :"admin2",
          password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
      }
      const response = await request.post('/auth/signin')
      .send(signinUser);
      token=response.body.accessToken;
      const userObject= await User.findOne({username: 'samy'});
      const userID=response.body.user._id;
      const res2 = await request.post('/friendship/create/'+userObject._id).set("x-access-token",token);
      const res = await request.get('/user/followingList/'+userID);
      expect(res.status).toBe(200);
      expect(res.body.following[0]._id.toString()).toBe(userObject._id.toString());
  })

  it ('testing get the user following list when user is not following anyone' , async() => {
      const signinUser = {
          data :"admin2",
          password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
      }
      const response = await request.post('/auth/signin')
      .send(signinUser);
      token=response.body.accessToken;
      const userObject= await User.findOne({username: 'samy'});
      const userID=userObject;
      const res = await request.get('/user/followingList/'+userID);
      expect(res.status).toBe(404);
      expect(res.body.following).toBe("user not found");

  })
})


describe('get the user follower list ', () => {
  it('testing get the user follower list ' , async() => {
      const signinUser = {
          data :"admin2",
          password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
      }
      const response = await request.post('/auth/signin')
      .send(signinUser);
      token=response.body.accessToken;
      const userObject= await User.findOne({username: 'samy'});
      const userID=response.body.user._id;
      const res2 = await request.post('/friendships/create/'+userObject._id).set("x-access-token",token);
      const res = await request.get('/user/followersList/'+userObject._id);
      expect(res.status).toBe(200);
      expect(res.body.follower[0]._id.toString()).toBe(userID.toString());
  })

  it ('testing get the user follower ids when user is not following anyone' , async() => {
      const signinUser = {
          data :"admin2",
          password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
      }
      const response = await request.post('/auth/signin')
      .send(signinUser);
      token=response.body.accessToken;
      const userObject= await User.findOne({username: 'samy'});
      const userID=response.body.user._id;
      const res = await request.get('/user/followersIDs/'+userID);
      expect(res.status).toBe(404);
      expect(res.body.follower).toBe("user not found");
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
        const userObject= await User.findOne({username: 'samy'});
        const userID=response.body.user._id;
        const res2 = await request.post('/friendships/create/'+userObject._id).set("x-access-token",token);
        const res = await request.post('/friendships/block/'+userObject._id).set("x-access-token",token);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("blocked");
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
          data :"essamAhmed",
          password: "$2afbg$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
      }
      const response = await request.post('/auth/signin')
      .send(signinUser);
      token=response.body.accessToken;
      const userObject= await User.findOne({username: 'samy'});
      const res = await request.post('/friendships/block/'+userObject._id).set("x-access-token",token);
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("the user is already blocking the user");
    })
})

describe( 'get the blocked users' , () => {
  it('testing get the blocked users',async()=>{
      const userObject= await User.findOne({username: 'essamAhmed'});
      const targetUser= await User.findOne({username: 'samy'});
      const res = await request.get('/user/blockedIDs/'+userObject._id);
      expect(res.status).toBe(200);
      expect(res.body.blocks[0].toString()).toBe(targetUser._id.toString());
})
it('testing get the blocked users when user is not blocking anyone',async()=>{
    const userObject= await User.findOne({username: 'samy'});
    const res = await request.get('/user/blockedIDs/'+userObject._id);
    expect(res.status).toBe(404);
    expect(res.body.blocks).toBe("user not found");
})
})
