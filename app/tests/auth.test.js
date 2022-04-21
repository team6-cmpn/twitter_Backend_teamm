
require("dotenv").config();
const app = require("../../app");
const supertest = require('supertest');
const request = supertest(app);
var jwt  = require("jsonwebtoken");
const User = require('../models/user.model');
const mongoose = require('mongoose');

//const { setupDB } = require('./test-setup');
//setupDB('Twitter_db_test', true);

    const userdata = [
      {
        username: 'Zell',
        email: 'testing@gmail.com',
        password: 'Ola123ola#',
        confirmed: true
    }, {
        username: 'Zell2',
        email: 'testing2@gmail.com',
        password: 'Ola123ola#'
    }, {
        username: 'Zell3',
        email: 'testing3@gmail.com',
        password: 'Ola123ola#',
        confirmed: true
    },
    {
        username: 'Zellconfirm',
        email: 'testingconfirm@gmail.com',
        password: 'Ola123ola#',
        confirmed: false
    },
    {
      googleId :"111",
      username: "coco",
      email: "req@coco.com"
    },

  ];


beforeAll(async () => {
    //await dropAllCollections()
    //await mongoose.connection.close()
    const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    await mongoose.connect(url,
        {
            useNewUrlParser: true,
            //useUnifiedTopology: true
        });
       await   User.insertMany(userdata)
})

afterAll(async () => {
       await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
})





describe('signup with email Test', () => {
    it('Should save user to database', async () => {
        const res = await request.post('/auth/signup')
            .send({
            username: 'ZellTest',
            email: 'testingZell@gmail.com',
            password: 'Ola123ola#'
            });
            // Ensures response contains name and email
            // expect(res.body.name).toBeTruthy();
            // expect(res.body.email).toBeTruthy();

            // Searches the user in the database
            await User.findOneAndDelete({email: 'testingZell@gmail.com' })
                .exec((err, user) => {
            expect(res.status).toBe(200);
            expect(res.body.message).toBe("An Email sent to your account please verify");
            expect(user.username).toBe('ZellTest');
            expect(user.email).toBe('testingZell@gmail.com');

  });
    });
    it('Should give 400 username already exists', async () => {
        const res = await request.post('/auth/signup')
            .send({
            username: 'Zell',
            email: 'testingZell@gmail.com',
            password: 'Ola123ola#'
            });
            expect(res.status).toBe(400);
            expect(res.body.message).toBe("Failed! There is an existing account with this Username");

    });
    it('Should give 400 email already exists', async () => {
        const res = await request.post('/auth/signup')
            .send({
            username: 'Zelllol',
            email: 'testing@gmail.com',
            password: 'Ola123ola#'
            });
            expect(res.status).toBe(400);
            expect(res.body.message).toBe("Failed! There is an existing account with this Email");

    });
});

// describe('confirm email Test', () => {
//     it('Should confirm the user who clicked on the link', async () => {
//         const signinUser = {
//             username: 'Zellconfirm',
//             password: "Ola123ola#"
//         }
//         jwt.sign(
//             {
//               "username" : "Zellconfirm",
//               "password" :"Ola123ola#",
//             },
//             process.env.EMAIL_SECRET,
//             {
//               expiresIn: '1d',
//             },
//             (err, emailToken) => {

//                 const res = request.get(`/auth/confirmation/${emailToken}`);
//                 console.log(res);
//                     //.send(emailToken);
//                 User.findOne({username: "Zellconfirm"})
//                 .exec((err, user) => {
//                     console.log(user);
//                     //expect(res.status).toBe(200);
//                     //expect(res.body.accessToken).toBeTruthy();
//                     expect(user.username).toBe('Zellconfirm');
//                     expect(user.confirmed).toBe(true);

//                 });
//             },
//         );
//     });
// });

describe('signin with email Test', () => {
    it('Should retrive user and token from database', async () => {
        const signinUser = {
            data :"Zell",
            password: "Ola123ola#"
        }
        const res = await request.post('/auth/signin')
            .send(signinUser);

        // Searches the user in the database
        await User.findOne({ $or:[ {email: signinUser.data},{username: signinUser.data},{ phoneNumber: signinUser.data}] })
        .exec((err, user) => {
            expect(res.status).toBe(200);
            expect(res.body.accessToken).toBeTruthy();
            console.log(res.body.accessToken);
            expect(user.username).toBe('Zell');
            expect(user.email).toBe('testing@gmail.com');
        });
    });
    it('Should give 404 as user not found', async () => {
        const signinUser = {
            data :"Zell1",
            password: "Ola123ola#"
        }
        const res = await request.post('/auth/signin')
            .send(signinUser);

        // Searches the user in the database
        await User.findOne({ $or:[ {email: signinUser.data},{username: signinUser.data},{ phoneNumber: signinUser.data}] })
        .exec((err, user) => {
            expect(res.status).toBe(404);
            expect(res.body.message).toBe("User Not found.");
        });
    });
    it('Should give 400 as user not confirmed', async () => {
        const signinUser = {
            data :"Zell2",
            password: "Ola123ola#"
        }
        const res = await request.post('/auth/signin')
        .send(signinUser);

        // Searches the user in the database
        await User.findOne({ $or:[ {email: signinUser.data},{username: signinUser.data},{ phoneNumber: signinUser.data}] })
        .exec((err, user) => {
            expect(res.status).toBe(400);
            expect(res.body.message).toBe("please confirm your email before login");
        });
    });
    it('Should give 401 as password is wrong', async () => {
        const signinUser = {
            data :"Zell3",
            password: "12345678"
        }
        const res = await request.post('/auth/signin')
        .send(signinUser);

        // Searches the user in the database
        await User.findOne({ $or:[ {email: signinUser.data},{username: signinUser.data},{ phoneNumber: signinUser.data}] })
        .exec((err, user) => {
            expect(res.status).toBe(401);
            expect(res.body.message).toBe("Wrong Password!");
        });
    });
});







// describe('signup email confirmation Test', () => {
//     it('Should save user to database', async () => {

//     });
// });
