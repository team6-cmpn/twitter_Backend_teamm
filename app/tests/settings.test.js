require("dotenv").config();
const config = require("../config/auth.config");
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
        confirmed: true,
        verificationCode : "452438"
    }, {
        username: 'Zell2',
        email: 'testing2@gmail.com',
        password: 'Ola123ola#'
    }, 
    {
        username: 'smsTest',
        phoneNumber: '+201097277904',
        password: 'Ola123ola#'
    }, 
    {
        username: 'Zell3',
        email: 'testing3@gmail.com',
        password: 'Ola123ola#',
        confirmed: true
    },
    {
        username: 'Zelldeactivate',
        email: 'testing4@gmail.com',
        password: 'Ola123ola#',
        confirmed: true
    },
    {
        username: 'Zellreactivate',
        email: 'testing5@gmail.com',
        password: 'Ola123ola#',
        confirmed: true,
        isDeactivated: true,
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

async function getToken (user) {
    return jwt.sign(
        {
        //username: user.username,
        id: user._id,
        isDeactivated: user.isDeactivated
        }
        , 
        config.secret, {
        expiresIn: '1d' 
      });
}

describe('Change password Test', () => {
    it('should change the password', async () => {
        //get the access token for a user
        const user = await User.findOne({ "username" : "Zell" })
        const token = await getToken(user);
        //send the request to change password
        const res = await request
            .post('/settings/changePassword')
            .set("x-access-token" , token)
            .send({
                    "currentPassword" : "Ola123ola#",
                    "password": "Ola123ola#1",
                    "confirmNewPassword": "Ola123ola#1"
                }) 
        // check the status ok and message
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("password was changed successfully");
        // log in with new password and accept 
        const signinUser = {
            data :"Zell",
            password: "Ola123ola#1"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);
        expect(response.status).toBe(200);
        expect(response.body.accessToken).toBeTruthy();
        
        // log in with old password and give wrong password error 
        const signinUser2 = {
            data :"Zell",
            password: "Ola123ola#"
        }
        const response2 = await request.post('/auth/signin')
        .send(signinUser2);
        expect(response2.status).toBe(401);
        expect(response2.body.message).toBe("Wrong Password!");
            
    });

    it('should give 401 wrong password', async () => {
        //get the access token for a user
        const user = await User.findOne({ "username" : "Zell2" })
        const token = await getToken(user);
        //send the request to change password
        const res = await request
            .post('/settings/changePassword')
            .set("x-access-token" , token)
            .send({
                    "currentPassword" : "Ola123ola#55",
                    "password": "Ola123ola#1",
                    "confirmNewPassword": "Ola123ola#1"
                }) 
        // check the status ok and message
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Wrong Password!");
        // log in with new password and accept 
        
    });
    it('should give 401 passwords does not match', async () => {
        //get the access token for a user
        const user = await User.findOne({ "username" : "Zell2" })
        const token = await getToken(user);
        //send the request to change password
        const res = await request
            .post('/settings/changePassword')
            .set("x-access-token" , token)
            .send({
                    "currentPassword" : "Ola123ola#",
                    "password": "Ola123ola#2",
                    "confirmNewPassword": "Ola123ola#1"
                }) 
        // check the status ok and message
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("new Password and confrim password do not match");
        // log in with new password and accept 
        
    });
    it('should give 400 weak password', async () => {
        //get the access token for a user
        const user = await User.findOne({ "username" : "Zell2" })
        const token = await getToken(user);
        //send the request to change password
        const res = await request
            .post('/settings/changePassword')
            .set("x-access-token" , token)
            .send({
                    "currentPassword" : "Ola123ola#",
                    "password": "Ola123ola",
                    "confirmNewPassword": "Ola123ola"
                }) 
        // check the status ok and message
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Failed! password must be 8 or more characters which contain at least one numeric digit, one uppercase and one lowercase letter")
        
    });

});

describe('Forget password send email or sms', () => {
    it('Should send an email to the user if he forgot the password and want to reset it', async () => {
        const res = await request.post('/settings/forgetPassword')
            .send({
            username: 'Zell2',
            data: 'testing2@gmail.com',
            });
            expect(res.status).toBe(200);
            expect(res.body.message).toBe("An Email sent to your account please click on it to reset your password");
    });
    
    it('Should give 404 user not exist', async () => {
        const res = await request.post('/settings/forgetPassword')
        .send({
            username: 'ZellZyElfol',
            data: 'testingZell@gmail.com',
        });
        expect(res.status).toBe(404);
        expect(res.body.message).toBe("user not found");
        
    });
    // UNCOMMENT AT THE DISSCUSSION
    // it('Should send an sms to the user if he forgot the password and want to reset it', async () => {
    //     const res = await request.post('/settings/forgetPassword')
    //         .send({
    //         username: 'smsTest',
    //         data: '+201097277904',
    //         });
    //         expect(res.status).toBe(200);
    //         expect(res.body.message).toBe("A verification code was sent to your mobile phone please click on it to reset your password");
    // });
});

describe('forget password recieve email Test', () => {
    it('Should confirm the user who clicked on the link', async () => {
        const user = await User.findOne({ "username" : "Zell" })
        const res = await request
            .post('/settings/receiveforgetPassword')
            .send({ verificationCode: '452438' });

        expect(res.status).toBe(200);
        expect(res.body.accessToken).toBeTruthy();
        
    });
});
// describe('forget password recieve email Test', () => {
//     it('Should confirm the user who clicked on the link', async () => {
//         const user = await User.findOne({ "username" : "Zell" })
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
//         const res = await request.get('/settings/forgetPassword/' + token);

//         expect(res.status).toBe(200);
//         expect(res.body.accessToken).toBeTruthy();
        
//     });
// });

describe('Forget password reset password', () => {
    it('Should send an email to the user if he forgot the password and want to reset it', async () => {
        const user = await User.findOne({ "username" : "Zell3" })
        const token = await getToken(user);
        const res = await request.post('/settings/resetForgetPassword')
            //.set({Authorization: token})
            .set("x-access-token", token)
            .send({
                "password": "Ola123ola#1",
                "confirmNewPassword": "Ola123ola#1"
            }); 
        //console.log(res);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("password was reset successfully");
        const signinUser = {
            data :"Zell3",
            password: "Ola123ola#1"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);
        expect(response.status).toBe(200);
        expect(response.body.accessToken).toBeTruthy();
            
    });
    
    it('Should give 401 passwords does not match', async () => {
        const user = await User.findOne({ "username" : "Zell3" })
        const token = await getToken(user);
        const res = await request.post('/settings/resetForgetPassword')
        .set("x-access-token", token)
        .send({
            "password": "Ola123ola#5",
            "confirmNewPassword": "Ola123ola#1"
        }); 
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("new Password and confrim password do not match");
        
    });
});

describe('Deactivate an account', () => {
    it('Should deactivate the user account', async () => {
        const user = await User.findOne({ "username" : "Zelldeactivate" })
        //console.log(user)
        const token = await getToken(user);
        const res = await request.put('/settings/deactivateAccount')
        .set("x-access-token", token)
        
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("your account has been decactivated successfully");
        const signinUser = {
            data :"Zelldeactivate",
            password: "Ola123ola#"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("This account is deactivated!");
            
    });
});

describe('Reactivate an account', () => {
    it('Should reactivate the deactivated user account', async () => {
        const signinUser = {
            data :"Zellreactivate",
            password: "Ola123ola#"
        }
        const response = await request.post('/auth/signin')
        .send(signinUser);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("This account is deactivated!");
            
        const user = await User.findOne({ "username" : "Zellreactivate" })
        //console.log(user)
        const token = await getToken(user);
        const res = await request.put('/settings/reactivateAccount')
        .set("x-access-token", token)

        expect(res.status).toBe(200);
        expect(res.body.accessToken).toBeTruthy();
            
    });
});