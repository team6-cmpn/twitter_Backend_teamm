const User = require('../models/user.model');
const Tweet = require('../models/tweet.model');
const Relations = require('../models/relations.model');

const app = require("../../app");
const mongoose = require('mongoose');
const supertest = require('supertest');
const request = supertest(app);
var jwt  = require("jsonwebtoken");
const controller = require("../controllers/admin.controller");
const { findById } = require('../models/user.model');
const { tweet } = require('../models');

// to create users database
// const user0=new User(
//     {
        
//         _id: '62503267a848908b0b2102f3', 
//         username : 'passwordTest', 
//         email: 'bcq33914@jiooq.com', 
//         password : '$2a$08$CyFJhhKeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C', 
//         followers : [
    
//         ], 
//         following : [
    
//         ], 
//         created_at : '2022-04-08T12:58:49.514+0000', 
//         confirmed : true, 
//         favorites : [
//             '625d594a9b671cf4db621969',
//             '625d594a9b671cf4db621900',
//             '625d918e67dc9b72474001bc'
//         ], 
//         admin_block : {
//             "blocked_by_admin" : false, 
//         }, 
//         retweets : [

//         ], 
//         relations : [
//             '627ff1ad4a6395ce9d95de58'
//         ]

//     })
const user1=new User(
    {
        username : "essam ahmed",
        _id:'62503267a848908b0b2102e3',
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
        favorites: [
            '625d594a9b671cf4db621969',
            '625d594a9b671cf4db621900',
            '625d918e67dc9b72474001bc'
        ],
        retweets:[
            '625d918e67dc9b72474001bc',
            '628036ed132f0fbc9e96b198'
        ]//,
        // relations:[
        //     '627ff1ad4a6395ce9d95de58', 
        // ]
    })

    const user2=new User({

        username : "admin2",
        _id:"62503267a848908b0b2102f3",
        email : "bcq34@jidffooq.com",
        password : "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C",
        followers : [],
        followers_count : 150,
        dateOfBirth :("2022-04-15T05:21:20.200Z"),
        following : [],
        admin_block : {
            "blocked_by_admin" : false
        },
        isAdmin : false,
        created_at : ("2022-04-15T02:59:23.228Z"),
        confirmed : true,
        favorites: [],
             //'625d594a9b671cf4db621969',
            // '625d594a9b671cf4db621900'
        retweets:[
            '628036ed132f0fbc9e96b198'
        ]//,
        // relations:[
        //     '627ff1ad4a6395ce9d95de5b', 
        // ]

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
            block_duration: 1120,
          block_createdAt: ("2022-04-17T02:59:23.228Z")
        },
        isAdmin : false,
        created_at : ("2022-04-15T02:59:23.228Z"),
        confirmed : true,
    })

const relations = [
    { 
        _id : '627ff1ad4a6395ce9d95de58', 
        user_id : '62503267a848908b0b2102e3', 
        username : 'admin2', 
        following : true, 
        follower : false, 
        blocked : false, 
        following_request_received : false, 
    },{
        _id : '627ff1ad4a6395ce9d95de5b', 
        user_id : '62503267a848908b0b2102f3', 
        username : 'essam ahmed', 
        following : false, 
        follower : true, 
        blocked : false, 
        following_request_received : false, 
    }
]

//to create my tweets database
const tweetdata =[
    {
        _id: '625d594a9b671cf4db621900',
        text: 'welcome to my 1 tweet',
        created_at: '2022-04-22T11:01:54.414Z',
        source: 'mobile',
        mention: '@ali',
        user: '62503267a848908b0b2102f3',
        favorites: []

    },{
        _id: '625d594a9b671cf4db621969',
        text: 'welcome to my 2 tweet',
        created_at: '2022-04-22T10:52:45.087Z',
        source: 'labtop',
        mention: '@mosal',
        user: '62503267a848908b0b2102f3',
        favorites: []
            //'62503267a848908b0b2102f3']
    },{
        _id: '625d918e67dc9b72474001bc',
        text: 'welcome to my 3 tweet',
        created_at: '2022-04-22T10:52:45.087Z',
        source: 'labtop',
        mention: '@whyyou',
        user: '62503267a848908b0b2102f3',
        favorites: [
            '62503267a848908b0b2102f3',
            //'62503267a848908b0b2102e3'
        ],
        retweetUsers:[
            '62503267a848908b0b2102e3'
        ]
    },{
        created_at:'2022-04-22T10:52:45.087Z',
        text:'welcome to 10 tweet',
        source:'mobile',
        mention:'@ali'
    },{
 
        _id : '628036ed132f0fbc9e96b198', 
        created_at: '2022-05-14T23:10:37.941+0000', 
        text: 'hope to be final 1', 
        source: 'mobile', 
        user: '62503267a848908b0b2102f3', 
        favorites: [
            '62503267a848908b0b2102f3'
        ], 
        mention : "admin2", 
        retweetUsers : [
            '62503267a848908b0b2102f3',
            '62503267a848908b0b2102e3'
        ], 
        hasImage : false, 
        
    },{   
        _id: '625d594a9b671cf4db621111',
        text: 'welcome to my 2 tweet',
        created_at: '2022-04-22T10:52:45.087Z',
        source: 'labtop',
        mention: '@mosal',
        user: '62503267a848908b0b2102e3',
        favorites: []
}
    

]


beforeAll(async () => {
    const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    await mongoose.connect(url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        //await user0.save()
        await  user1.save()
        await user2.save()
        await user3.save()
        await user4.save()
        await user5.save()
        await user6.save()
        await  Tweet.insertMany(tweetdata)
        await Relations.insertMany(relations)
    //await mongoose.connection.dropDatabase();
 });

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
})


/////////////////////////////////////////create a tweet test//////////////
describe('update & creating a tweet',() =>{
    it('should check blocked by admin',async()=>{
        const signinUser = {
            data :"samy",
            password: "$2a$08$ffdhhefCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);
        token=response.body.accessToken
        const res = await request.post('/tweets/update').set("x-access-token",token)
        //console.log(res.body.message)
        expect(res.body.message).toBeTruthy()
        expect(res.status).toBe(400)
    });

    it('should save tweet in database', async()=>{
        const signinUser = {
            data :"admin2",
            password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);
        token=response.body.accessToken
        const res = await request.post('/tweets/update').set("x-access-token",token)
        .send({
            text: 'welcome to my new tweet',
            source: 'mobile',
            mention: '@ali',
        });
        Tweet.findOneAndDelete({text: 'welcome to my new tweet'})
        .exec((err,post)=>{
            expect(res.status).toBe(201);
            //expect(res.body.message).toBe("newtweet");
            expect(post.text).toBe('welcome to my new tweet');
        })
    });

    it('should give 403 if tweet duplicated',async()=>{
        const signinUser = {
            data :"admin2",
            password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);
        token=response.body.accessToken
        const res = await request.post('/tweets/update').set("x-access-token",token)
        .send({
            //_id: '62628b22df8acac4689b5022',
            text: 'welcome to my 1 tweet',
            created_at: '2022-04-22T11:01:54.414Z',
            source: 'mobile',
            mention: '@ali'
        });
        expect(res.status).toBe(403);
        expect(res.body.message).toBe("tweet duplication")
    });

    it('should give 403 there is no text',async()=>{
        const signinUser = {
            data :"admin2",
            password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);
        token=response.body.accessToken
        const res = await request.post('/tweets/update').set("x-access-token",token)
        .send({
            //_id: '62628b22df8acac4689b5022',
            created_at: '2022-04-22T11:01:54.414Z',
            source: 'mobile',
        });
        expect(res.status).toBe(403);
        expect(res.body.message).toBe("forbidden! no text entered in the tweet")
    });
});

/////////////////////////////////////////show a tweet test//////////////
describe('return tweet exist in databse',()=>{
    it('should return 200 and required tweet object',async()=>{
        const tweetId = '625d594a9b671cf4db621969';
        const res = await request.get('/tweets/show/'+ tweetId)
        expect(res.body).toBeTruthy()
        //console.log(res.body);
    });
    it('should return tweet not found if passed wrong id not found in database',async()=>{
        const tweetId = '625d594a9b671cf4db621960';
        const res = await request.get('/tweets/show/'+ tweetId)
        expect(res.body.message).toBe("tweet not found")
    });
});

/////////////////////////////////////////like a tweet test//////////////
describe('like a tweet test',()=>{
    it('should return 0 if not liked',async()=>{
        const signinUser = {
            data :"admin2",
            password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);
        token=response.body.accessToken
        const tweetId = '625d594a9b671cf4db621900';
        const userId = '62503267a848908b0b2102f3';
        const res = await request.post('/tweets/favorites/create/'+ tweetId).set("x-access-token",token)
        expect(res.body).toBeTruthy()
    });

    it('should return tweet already liked',async()=>{
        const signinUser = {
            data :"essam ahmed",
            password: "$2afbg$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);
        token=response.body.accessToken
        const tweetId = '625d918e67dc9b72474001bc';
        const userId = '62503267a848908b0b2102f3';
        const res = await request.post('/tweets/favorites/create/'+ tweetId).set("x-access-token",token)
        expect(res.body.message).toBe('tweet already liked')
        //console.log(res.body.message)
    });

    it('should 200 that tweet successfuly liked',async()=>{
        const signinUser = {
            data :"admin2",
            password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);
        token=response.body.accessToken
        const tweetId = '625d594a9b671cf4db621969';
        const userId = '62503267a848908b0b2102f3';
        const res = await request.post('/tweets/favorites/create/'+ tweetId).set("x-access-token",token)
        expect(res.status).toBe(200)
        expect(res.body).toBeTruthy()
    });
});

/////////////////////////////////////////unlike a tweet test//////////////
describe('unlike tweet test',()=>{
    it('should return status 200 if succeefuly unliked',async()=>{
        const signinUser = {
            data :"admin2",
            password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);
        token=response.body.accessToken
        const tweetId = '625d918e67dc9b72474001bc';
        const userId = '62503267a848908b0b2102f3';
        const res = await request.post('/tweets/favorites/destroy/'+ tweetId).set("x-access-token",token)
        expect(res.status).toBe(200)
    });
    it('should return 0 if tweet already unliked',async()=>{
        const signinUser = {
            data :"admin2",
            password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);
        token=response.body.accessToken
        const tweetId = '625d594a9b671cf4db621900';
        const userId = '62503267a848908b0b2102f3';
        const res = await request.post('/tweets/favorites/destroy/'+ tweetId).set("x-access-token",token)
        expect(res.body).toBeTruthy()
    });
});

/////////////////////////////////////////retweet a tweet test//////////////
describe('retweet a tweet test',()=>{
    it('should check blocked by admin',async()=>{
        const signinUser = {
            data :"samy",
            password: "$2a$08$ffdhhefCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);
        token=response.body.accessToken
        const tweetId = '625d594a9b671cf4db621900'
        const res = await request.post('/tweets/retweet/'+ tweetId).set("x-access-token",token)
        //console.log(res.body.message)
        expect(res.body.message).toBeTruthy()
        expect(res.status).toBe(400)
    });
    it('should return 0 if not retweeted',async()=>{
        const signinUser = {
            data :"admin2",
            password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);
        token=response.body.accessToken
        const tweetId = '625d594a9b671cf4db621900';
        const userId = '62503267a848908b0b2102f3';
        const res = await request.post('/tweets/retweet/'+ tweetId).set("x-access-token",token)
        expect(res.body).toBeTruthy()
    });
    it('should return tweet already retweeted',async()=>{
        const signinUser = {
            data :"essam ahmed",
            password: "$2afbg$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);
        token=response.body.accessToken
        const tweetId = '625d918e67dc9b72474001bc';
        const userId = '62503267a848908b0b2102e3';
        const res = await request.post('/tweets/retweet/'+ tweetId).set("x-access-token",token)
        expect(res.body.message).toBe('tweet already retweeted')
    });
    it('should 200 that tweet successfuly retweeted',async()=>{
        const signinUser = {
            data :"admin2",
            password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);
        token=response.body.accessToken
        const tweetId = '625d594a9b671cf4db621969';
        const userId = '62503267a848908b0b2102f3';
        const res = await request.post('/tweets/retweet/'+ tweetId).set("x-access-token",token)
        expect(res.status).toBe(200)
        expect(res.body).toBeTruthy()
    });
    it('should return 400 if wrong tweet id not found in database',async()=>{
        const signinUser = {
            data :"admin2",
            password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);
        token=response.body.accessToken
        const tweetId = '625d594a9b671cf4db62196l';
        const userId = '62503267a848908b0b2102f3';
        const res = await request.post('/tweets/retweet/'+ tweetId).set("x-access-token",token)
        expect(res.status).toBe(400)
        //expect(res.body).toBeTruthy()
    });

});

/////////////////////////////////////////unretweet a tweet test//////////////
describe('retweet a tweet test',()=>{
    it('should return tweet already unretweeted',async()=>{
        const signinUser = {
            data :"admin2",
            password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);
        token=response.body.accessToken
        const tweetId = '625d918e67dc9b72474001bc';
        const res = await request.post('/tweets/unretweet/'+ tweetId).set("x-access-token",token)
        expect(res.body.message).toBe('tweet already unretweeted')
    });
    it('should 200 that tweet successfuly unretweeted',async()=>{
        const signinUser = {
            data :"essam ahmed",
            password: "$2afbg$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);
        token=response.body.accessToken
        const tweetId = '625d918e67dc9b72474001bc';
        const res = await request.post('/tweets/unretweet/'+ tweetId).set("x-access-token",token)
        expect(res.status).toBe(200)
        //expect(res.body).toBeTruthy()
    });
    it('should 400 tweet not found',async()=>{
        const signinUser = {
            data :"essam ahmed",
            password: "$2afbg$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);
        token=response.body.accessToken
        const tweetId = '625d918e67dc9b72474001b8';
        const res = await request.post('/tweets/unretweet/'+ tweetId).set("x-access-token",token)
        expect(res.status).toBe(400)
    });
});


/////////////////////////////////////////delete a tweet test//////////////
describe('delete a tweet test',()=>{
    it('return 200 tweet deleted succesfully',async()=>{
        const signinUser = {
            data :"admin2",
            password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);
        token=response.body.accessToken
        const tweetId = '625d594a9b671cf4db621969';
        const res = await request.post('/tweets/destroy/'+ tweetId).set("x-access-token",token)
        expect(res.status).toBe(200)
    });
    it('user cannot delete another user tweet',async()=>{
        const signinUser = {
            data :"admin2",
            password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);
        token=response.body.accessToken
        const tweetId = '625d594a9b671cf4db621111';
        const res = await request.post('/tweets/destroy/'+ tweetId).set("x-access-token",token)
        expect(res.body.message).toBe("can't delete another user tweet")
    });   
     it('return 200 tweet deleted succesfully',async()=>{
        const signinUser = {
            data :"admin2",
            password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);
        token=response.body.accessToken
        const tweetId = '625d594a9b671cf4db621960';
        const res = await request.post('/tweets/destroy/'+ tweetId).set("x-access-token",token)
        expect(res.status).toBe(403)
        expect(res.body.message).toBe("tweet id doesn't exist")
    });
});

/////////////////////////////////////////retweeters of a tweet tweet test//////////////
describe('retweeters of a tweet test',()=>{
    it('return 200 with tweeters list',async()=>{

        const tweetId = '628036ed132f0fbc9e96b198';
        const res = await request.get('/tweets/retweeters/'+ tweetId)
        expect(res.status).toBe(200)
    });
    it('tweet not found',async()=>{
        const tweetId = '628036ed132f0fbc9e96b190';
        const res = await request.get('/tweets/retweeters/'+ tweetId)
        //expect(res.body.message).toBe("tweet not found in database")
        expect(res.status).toBe(404)
    });

});

/////////////////////////////////////////favorite list of a tweet tweet test//////////////

describe('favorite list of users  of a tweet test',()=>{
    it('return 200 with favorite list of users',async()=>{

        const tweetId = '628036ed132f0fbc9e96b198';
        const res = await request.get('/tweets/favoritelist/'+ tweetId)
        expect(res.status).toBe(200)
    });
    it('tweet not found',async()=>{
        const tweetId = '628036ed132f0fbc9e96b190';
        const res = await request.get('/tweets/favoritelist/'+ tweetId)
        //expect(res.body.message).toBe("tweet not found in database")
        expect(res.status).toBe(404)
    });

});

//////////////////////lookup test///////////////////////
// describe('newsfeed timeline tweeter test',()=>{
//     it('return 200 with favorite list of users',async()=>{
//         const signinUser = {
//             data :"essam ahmed",
//             password: "$2afbg$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
//         }
//         const response = await request.post('/auth/signin')
//         .send(signinUser);
//         token=response.body.accessToken

//         const page = '1';
//         const count ='5';
//         const userID ='62503267a848908b0b2102f3';
//         const res2 = await request.post('/friendships/create/'+userID).set("x-access-token",token);
//         const res = await request.get('/tweets/lookup/'+ page+count).set("x-access-token",token)
//         //expect(res2.status).toBe(200)
//         expect(res.status).toBe(200)


//     });
    // it('tweet not found',async()=>{
    //     const signinUser = {
    //         data :"admin2",
    //         password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
    //     }
    //     const response = await request.post('/auth/signin')
    //     .send(signinUser);
    //     token=response.body.accessToken

    //     const page = '1';
    //     const count ='5';
    //     const res = await request.get('/tweets/lookup/'+ page+count).set("x-access-token",token)
    //     //expect(res.body.message).toBe("tweet not found in database")
    //     expect(res.status).toBe(404)
    // });

//});
