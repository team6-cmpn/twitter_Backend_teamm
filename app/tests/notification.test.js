
 const User = require('../models/user.model');
 const Tweet = require('../models/tweet.model');
 const app = require("../../app");
 const supertest = require('supertest');
 const request = supertest(app);
 var jwt  = require("jsonwebtoken");
const mongoose = require('mongoose');







const user1=new User({

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









beforeAll(async () => {
        const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
        await mongoose.connect(url,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
      await  user1.save()
     });

     afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
         await mongoose.connection.close();
     })







     describe("Notification test",() => {
     it("gets all notification history", async () => {
       const signinUser = {
           data :"admin2",
           password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
       }

       const response = await request.post('/auth/signin')
           .send(signinUser);
           token=response.body.accessToken
           const res= await request.get("/notifications").set("x-access-token",token)
           expect(res.status).toBe(200);
           expect(res.body).toBeTruthy();
})


it("gets all notification history for favorites only", async () => {
  const signinUser = {
      data :"admin2",
      password: "$2a$08$defCyeNs1aIEmXae6FOueVrLc5.jtDh36Ogk2N0H3GR3JmXXe1C"
  }

  const response = await request.post('/auth/signin')
      .send(signinUser);
      token=response.body.accessToken
      const res= await request.get("/notifications/favourites").set("x-access-token",token)
      expect(res.status).toBe(200);
      expect(res.body).toBeTruthy();
})


})
