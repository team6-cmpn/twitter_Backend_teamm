
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
        verificationCode: "321880"
    },
    {
      googleId :"111",
      username: "coco",
      email: "req@coco.com"
    },{
        username: 'smsTest',
        phoneNumber: '+201097277955',
        password: 'Ola123ola#'
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





describe('signup with email or mobile phone Test', () => {
    it('Should save user to database with email ', async () => {
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
    // UNCOMMENT AT THE DISSCUSSION
//     it('Should save user to database with phone number', async () => {
//         const res = await request.post('/auth/signup')
//             .send({
//             username: 'OLasmsTest',
//             phoneNumber: '+201097277904',
//             password: 'Ola123ola#'
//             });
//             // Ensures response contains name and email
//             // expect(res.body.name).toBeTruthy();
//             // expect(res.body.email).toBeTruthy();

//             // Searches the user in the database
//             await User.findOneAndDelete({phoneNumber: '+201097277904'})
//                 .exec((err, user) => {
//             expect(res.status).toBe(200);
//             expect(res.body.message).toBe("A verification code was sent to your mobile phone please verify");
//             // console.log(user);
//             // expect(user.username).toBe('OLasmsTest');
//             // expect(user.phoneNumber).toBe('+201097277904');

//   });
//     });
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
    it('Should give 400 phone number already exists', async () => {
        const res = await request.post('/auth/signup')
            .send({
            username: 'olaTest',
            phoneNumber: '+201097277955',
            password: 'Ola123ola#'
            });
            expect(res.status).toBe(400);
            expect(res.body.message).toBe("Failed! There is an existing account with this phoneNumber");

    });
    it('Should give 400 email not valid', async () => {
        const res = await request.post('/auth/signup')
            .send({
            username: 'Zelllol1',
            email: 'testing.gmail.com',
            password: 'Ola123ola#'
            });
            expect(res.status).toBe(400);
            expect(res.body.message).toBe("Failed! Email not valied!");

    });
    it('Should give 400 phone number not valid', async () => {
        const res = await request.post('/auth/signup')
            .send({
            username: 'hamada',
            phoneNumber: '01056988402',
            password: 'Ola123ola#'
            });
            expect(res.status).toBe(400);
            expect(res.body.message).toBe("Failed! phone number not valied!");

    });
    it('Should give 400 weak password', async () => {
        const res = await request.post('/auth/signup')
            .send({
            username: 'Zelllol2',
            email: 'testing11@gmail.com',
            password: 'Ola'
            });
            expect(res.status).toBe(400);
            expect(res.body.message).toBe("Failed! password must be 8 or more characters which contain at least one numeric digit, one uppercase and one lowercase letter");

    });
});

describe('resend email test', () => {
    it('Should resend email to user to confirm the email', async () => {
        const newEmailtoken = jwt.sign(
            { 
              //"id" : "6260161a7c620af6ccc13149",
              "username" : "resendTest",
              "password" :"Ola123ola#",
              "email" : "lolosoftwaretest@gmail.com" 
            }, 
            process.env.EMAIL_SECRET, {
            expiresIn: '1d' 
          });
          //the token is prepared on jwt.io with my email and co expiration date
        const res = await request
            .post('/auth/resendEmail')
            .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJsb2xvc29mdHdhcmV0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.V-5crmzqYb3ZqZfcA-94oIZfprOKtje5rX02GoDfUwI') 
        //console.log(res)
            // Ensures response contains name and email
            // expect(res.body.name).toBeTruthy();
            // expect(res.body.email).toBeTruthy();

            // Searches the user in the database
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("An Email is resent to your account please verify");
        expect(res.body.emailtoken).toBeTruthy();
    });

});

describe('confirm email Test', () => {
    it('Should confirm the user who clicked on the link', async () => {
        //const user = await User.findOne({ "username" : "Zellconfirm" })
        //console.log(user);
        const signinUser = {
            data :"Zellconfirm",
            password: "Ola123ola#"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);

        // Searches the user in the database
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("please confirm your email before login");
        
        const res = await request
            .post('/auth/confirmation')
            .send({verificationCode: "321880"})
        //console.log(res);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("user has been confirmed successfully");
        //expect(res.body.accessToken).toBeTruthy();
        
    });
});
// describe('confirm email Test', () => {
//     it('Should confirm the user who clicked on the link', async () => {
//         const user = await User.findOne({ "username" : "Zellconfirm" })
//         //console.log(user);
//         const signinUser = {
//             data :"Zellconfirm",
//             password: "Ola123ola#"
//         }
//         const response = await request.post('/auth/signin')
//         .send(signinUser);

//         // Searches the user in the database
//         expect(response.status).toBe(400);
//         expect(response.body.message).toBe("please confirm your email before login");
        
        
//         const token  = await jwt.sign({
//                 //username: user.username,
//                     "id" :user._id,
//                     "username" : user.username,
//                     "password" :user.password,
//                     "email" : user.email
//                 }, 
//                 process.env.EMAIL_SECRET, {
//                 expiresIn: '1d' 
//         });
//         const res = await request.get('/auth/confirmation/' + token);
//         //console.log(res);
//         expect(res.status).toBe(200);
//         expect(res.body.message).toBe("user has been confirmed successfully");
//         //expect(res.body.accessToken).toBeTruthy();
        
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
            //console.log(res.body.accessToken);
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
