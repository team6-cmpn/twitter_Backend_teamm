
//  const User = require('../models/user.model');
//  const Tweet = require('../models/tweet.model');
//  const app = require("../../app");
//  const supertest = require('supertest');
//  const request = supertest(app);
//  var jwt  = require("jsonwebtoken");
// const mongoose = require('mongoose');



// const user1=new User(
//   {

//       username : "essam ahmed",
//       email : "bcq34@frjidffooq.com",
//       password : "$2afbg$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C",
//       followers : [],
//       followers_count : 150,
//       dateOfBirth :"1975-05-02 00:20:19.197Z",
//       following : [],
//       admin_block : {
//           "blocked_by_admin" : false
//       },
//       isAdmin : false,
//       confirmed : true
//   })

//   const user2=new User({

//       username : "admin2",
//       email : "bcq34@jidffooq.com",
//       password : "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C",
//       followers : [],
//       followers_count : 150,
//       dateOfBirth :("2022-04-15T05:21:20.200Z"),
//       following : [],
//       admin_block : {
//           "blocked_by_admin" : false
//       },
//       isAdmin : true,
//       created_at : ("2022-04-15T02:59:23.228Z"),
//       confirmed : true,
//   })

//   const user3=new User({

//       username : "admin3",
//       email : "brcq34@jidffooq.com",
//       password : "$2pv$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C",
//       followers : [],
//       followers_count : 150,
//       dateOfBirth :("2022-04-15T05:21:20.200Z"),
//       following : [],
//       admin_block : {
//           "blocked_by_admin" : false
//       },
//       isAdmin : true,
//       created_at : ("2022-04-15T02:59:23.228Z"),
//       confirmed : true,
//   })


//   const user4=new User({

//       username : "mosalah",
//       email : "bcq34@rrjidffooq.com",
//       password : "$2a$08$dhhefCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C",
//       followers : [],
//       followers_count : 150,
//       dateOfBirth :("2022-04-15T05:21:20.200Z"),
//       following : [],
//       admin_block : {
//           blocked_by_admin : true,
//           block_duration: 2,
//         block_createdAt: ("2022-04-17T02:59:23.228Z")
//       },
//       isAdmin : false,
//       created_at : ("2022-04-15T02:59:23.228Z"),
//       confirmed : true,
//   })

//   const user5=new User({

//       username : "mostafa",
//       email : "bcq34@rrjidffaaooq.com",
//       password : "$aa2a$08$dhhefCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C",
//       followers : [],
//       followers_count : 150,
//       dateOfBirth :("2022-04-15T05:21:20.200Z"),
//       following : [],
//       admin_block : {
//           blocked_by_admin : false
//       },
//       isAdmin : false,
//       created_at : ("2022-04-15T02:59:23.228Z"),
//       confirmed : true,
//   })

//   const user6=new User({

//       username : "samy",
//       email : "bcq34@rrjidfqqfooq.com",
//       password : "$2a$08$ffdhhefCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C",
//       followers : [],
//       followers_count : 150,
//       dateOfBirth :("2022-04-15T05:21:20.200Z"),
//       following : [],
//       admin_block : {
//           blocked_by_admin : true,
//           block_duration: 20,
//         block_createdAt: ("2022-04-17T02:59:23.228Z")
//       },
//       isAdmin : false,
//       created_at : ("2022-04-15T02:59:23.228Z"),
//       confirmed : true,
//   })


// const tweetData = [

//   {
//     text : "oppo is the worst",
//     retweet_count : 10,
//     favorite_count : 10,
//     created_at: "2020-04-14T12:58:49.514Z"
// },

// {
// text : "Beer is the worst",
// retweet_count : 10,
// favorite_count : 10,
//   created_at: "2020-04-14T12:58:49.514Z"
// },

// {
// text : "pepsi is the worst",
// retweet_count : 10,
// favorite_count : 10,
//   created_at: "2020-04-14T12:58:49.514Z"
// }];



// beforeAll(async () => {
//         const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
//         await mongoose.connect(url,
//             {
//                 useNewUrlParser: true,
//                 useUnifiedTopology: true
//             });
//         //  await   User.insertMany(userData)
//       await  user1.save()
//         await user2.save()
//           await user3.save()
//           await user4.save()
//           await user5.save()
//             await user6.save()
//           await  Tweet.insertMany(tweetData)
//         //await mongoose.connection.dropDatabase();
//      });

//      afterAll(async () => {
//         await mongoose.connection.db.dropDatabase();
//          await mongoose.connection.close();
//      })


//      describe("Admin statistics test",() => {
//      it("gets the admin dashBoard endpoint", async () => {
//        const signinUser = {
//            data :"admin2",
//            password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
//        }

//        const response = await request.post('/auth/signin')
//            .send(signinUser);
//            token=response.body.accessToken

//            const res= await request.get("/admin/dashBoard").set("x-access-token",token)

//            expect(res.status).toBe(200);
//            expect(res.body).toBeTruthy();

//   });

//      it("normal user whose access is forbidden ", async () => {

//        const signinUser = {
//            data :"essam ahmed",
//            password: "$2afbg$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
//        }
//        const response = await request.post('/auth/signin')
//            .send(signinUser);
//            token=response.body.accessToken
//           const res= await request.get("/admin/dashBoard").set("x-access-token",token)
//           expect(res.status).toBe(403);
//           expect(res.body.message).toBe("Forbidden, you must be an admin");
//  });

//   });

//     describe("Admin show users test",() => {
//    it("sign in with admin and can show users", async () => {
//      const signinUser = {
//        data :"admin2",
//        password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"

//      }

//      const response = await request.post('/auth/signin')
//          .send(signinUser);
//          token=response.body.accessToken

//          const res= await request.get("/admin/showUsers").set("x-access-token",token)
//          expect(res.status).toBe(200);
//           expect(res.body).toBeTruthy();


//      });

//      it("normal user whose access is forbidden ", async () => {

//        const signinUser = {
//            data :"essam ahmed",
//            password: "$2afbg$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
//        }
//        const response = await request.post('/auth/signin')
//            .send(signinUser);
//            token=response.body.accessToken
//           const res= await request.get("/admin/showUsers").set("x-access-token",token);
//           expect(res.status).toBe(403);
//           expect(res.body.message).toBe("Forbidden, you must be an admin");
//  });

//       });




//       describe("Admin create block test",() => {
//       it(" it will make admin block normal user", async () => {
//        const signinUser = {
//          data :"admin2",
//          password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
//        }
//        const response = await request.post('/auth/signin')
//            .send(signinUser);
//            token=response.body.accessToken
//            id=user1._id.toString().replace(/ObjectId\("(.*)"\)/, "$1")
//            const res= await request.post("/adminBlock/create").set("x-access-token",token).query({ userid: String(id) }).send({duration: 2})
//              expect(res.status).toBe(200)
//               expect(res.body).toBeTruthy();
//               expect(res.body.admin_block.blocked_by_admin).toBe(true)

//      });

//      it(" it will make internal server error cant detect the id ", async () => {
//       const signinUser = {
//         data :"admin2",
//         password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
//       }

//       const response = await request.post('/auth/signin')
//           .send(signinUser);
//           token=response.body.accessToken
//           id1=user1._id.toString().replace(/ObjectId\("(.*)"\)/, "$1")
//           id= id1+"a"
//           const res= await request.post("/adminBlock/create").set("x-access-token",token).query({ userid: String(id) }).send({duration: 2})
//             expect(res.status).toBe(500)

//        });

//        it(" admin will make a block for an admin which not allowed ", async () => {
//         const signinUser = {
//           data :"admin2",
//           password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
//         }

//         const response = await request.post('/auth/signin')
//             .send(signinUser);
//             token=response.body.accessToken
//             id=user3._id.toString().replace(/ObjectId\("(.*)"\)/, "$1")
//             const res= await request.post("/adminBlock/create").set("x-access-token",token).query({ userid: String(id) }).send({duration: 2})
//               expect(res.status).toBe(403)
//                expect(res.body.message).toBe(" You can't block an admin  ")
//   });


//   it(" will get user not found ", async () => {
//    const signinUser = {
//      data :"admin2",
//      password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
//    }

//    const response = await request.post('/auth/signin')
//        .send(signinUser);
//        token=response.body.accessToken
//        id = "626084f2857783b48e4dc994"       // random id
//        const res= await request.post("/adminBlock/create").set("x-access-token",token).query({ userid: id }).send({duration: 2})

//          expect(res.status).toBe(404)
//           expect(res.body.message).toBe("user not found")

//     });

//     it(" test make  normal user  block user which is forbidden ", async () => {
//      const signinUser = {
//        data :"essam ahmed",
//        password: "$2afbg$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
//      }

//      const response = await request.post('/auth/signin')
//          .send(signinUser);
//          token=response.body.accessToken
//         id=user5._id.toString().replace(/ObjectId\("(.*)"\)/, "$1")
//         const res= await request.post("/adminBlock/create").set("x-access-token",token).query({ userid: id }).send({duration: 2})

//           expect(res.status).toBe(403)
//            expect(res.body.message).toBe("Forbidden, you must be an admin")

//   });

//   it(" test make  normal user  block admin which is forbidden ", async () => {
//    const signinUser = {
//      data :"essam ahmed",
//      password: "$2afbg$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
//    }

//    const response = await request.post('/auth/signin')
//        .send(signinUser);
//        token=response.body.accessToken
//       id=user2._id.toString().replace(/ObjectId\("(.*)"\)/, "$1")
//       const res= await request.post("/adminBlock/create").set("x-access-token",token).query({ userid: id }).send({duration: 2})

//         expect(res.status).toBe(403)
//          expect(res.body.message).toBe("Forbidden, you must be an admin")

//   });

// // block after block_duration
// //cant block because still blocked

// it(" Admin try to block a user who was blocked and his duration ended ", async () => {
//  const signinUser = {
//    data :"admin2",
//    password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
//  }

//  const response = await request.post('/auth/signin')
//      .send(signinUser);
//      token=response.body.accessToken
//     id=user4._id.toString().replace(/ObjectId\("(.*)"\)/, "$1")

//     const res= await request.post("/adminBlock/create").set("x-access-token",token).query({ userid: id }).send({duration: 2})
//       console.log(res)
//       expect(res.status).toBe(200)
//        expect(res.body).toBeTruthy()


// });

// it(" Admin try to block a user who is already blocked", async () => {
//  const signinUser = {
//    data :"admin2",
//    password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
//  }

//  const response = await request.post('/auth/signin')
//      .send(signinUser);
//      token=response.body.accessToken
//     id=user6._id.toString().replace(/ObjectId\("(.*)"\)/, "$1")

//     const res= await request.post("/adminBlock/create").set("x-access-token",token).query({ userid: id }).send({duration: 2})
//       console.log(res)
//       expect(res.status).toBe(400)
//        expect(res.body.message).toBeTruthy()


// });
//           });
