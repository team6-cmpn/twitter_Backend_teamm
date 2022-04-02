const app = require("../../app");
const supertest = require('supertest');
const request = supertest(app);

const User = require('../models/user.model');
const { setupDB } = require('./test-setup');

setupDB('Twitter_db_test', true);

describe('signup with email Test', () => {
    it('Should save user to database', async () => {
        const res = await request.post('/auth/signup')
            .send({
            username: 'ZellTest',
            email: 'testingZell@gmail.com',
            password: '12345678'
            });
            // Ensures response contains name and email
            // expect(res.body.name).toBeTruthy();
            // expect(res.body.email).toBeTruthy();
            
            // Searches the user in the database
        await User.findOneAndDelete({ email: 'testingZell@gmail.com' })
            .exec((err, user) => {
            expect(res.status).toBe(200);
            expect(user.username).toBe('ZellTest');
            expect(user.email).toBe('testingZell@gmail.com');
        });

    });
    it('Should give 400 username already exists', async () => {
        const res = await request.post('/auth/signup')
            .send({
            username: 'Zell',
            email: 'testingZell@gmail.com',
            password: '12345678'
            });
            expect(res.status).toBe(400);
            expect(res.body.message).toBe("Failed! There is an existing account with this Username");

    });
    it('Should give 400 email already exists', async () => {
        const res = await request.post('/auth/signup')
            .send({
            username: 'Zelllol',
            email: 'testing@gmail.com',
            password: '12345678'
            });
            expect(res.status).toBe(400);
            expect(res.body.message).toBe("Failed! There is an existing account with this Email");

    });
});

describe('signin with email Test', () => {
    it('Should retrive user and token from database', async () => {
        const signinUser = {
            data :"Zell",
            password: "12345678"
        }
        const res = await request.post('/auth/signin')
            .send(signinUser);

        // Searches the user in the database
        await User.findOne({ $or:[ {email: signinUser.data},{username: signinUser.data},{ phoneNumber: signinUser.data}] })
        .exec((err, user) => {
            if (!user) {
                expect(res.status).toBe(404);
            }
            if (!user.confirmed){
                expect(res.status).toBe(400);
            }
            expect(res.status).toBe(200);
            expect(res.body.accessToken).toBeTruthy();
            expect(user.username).toBe('Zell');
            expect(user.email).toBe('testing@gmail.com');
        });
    });
    it('Should give 404 as user not found', async () => {
        const signinUser = {
            data :"Zell1",
            password: "12345678"
        }
        const res = await request.post('/auth/signin')
            .send(signinUser);

        // Searches the user in the database
        await User.findOne({ $or:[ {email: signinUser.data},{username: signinUser.data},{ phoneNumber: signinUser.data}] })
        .exec((err, user) => {
            expect(res.status).toBe(404);
        });
    });
    it('Should give 400 as user not confirmed', async () => {
        const signinUser = {
            data :"Zell2",
            password: "12345678"
        }
        const res = await request.post('/auth/signin')
            .send(signinUser);

        // Searches the user in the database
        await User.findOne({ $or:[ {email: signinUser.data},{username: signinUser.data},{ phoneNumber: signinUser.data}] })
        .exec((err, user) => {
            expect(res.status).toBe(400);
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
        });
    });
});

// describe('signup email confirmation Test', () => {
//     it('Should save user to database', async () => {

//     });
// });