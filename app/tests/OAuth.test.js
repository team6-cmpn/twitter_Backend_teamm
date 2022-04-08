const app = require("../../app");
const supertest = require('supertest');
const request = supertest(app);

const User = require('../models/user.model');
const { setupDB } = require('./test-setup');

setupDB('auth-testing', true);

describe('signup with google Test', () => {
    it('Should save user to database by doodle id' , async () => {
        const res = await request.post('/OAuth/google/signup')
            .send({
                "googleId": "123",
                "username": "googleTest",
                "email": "google@test.com"
            });
           
            // Searches the user in the database
        await User.findOneAndDelete({ googleId: "123" })
            .exec((err, user) => {
            expect(res.status).toBe(200);
            console.log(user);
            expect(user.username).toBe("googleTest");
            expect(user.email).toBe("google@test.com");
            expect(res.body.accessToken).toBeTruthy();
        });

    });
    // valid email
    it('Should give 400 googleId already exists' , async () => {
        const res = await request.post('/OAuth/google/signup')
            .send({
                googleId :"111",
                username: "lolo",
                email: "req.lolo.ejknj5maill"
            });
           
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Failed! There is an existing account with this google id");
    });
    it('Should give 400 username already exists' , async () => {
        const res = await request.post('/OAuth/google/signup')
            .send({
                googleId :"333",
                username: "coco",
                email: "req.coco3.ejknj5maill"
            });
           
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Failed! There is an existing account with this Username");
    });
    it('Should give 400 email already exists' , async () => {
        const res = await request.post('/OAuth/google/signup')
            .send({
                googleId :"444",
                username: "coco4",
                email: "req.coco.ejknj5maill"
            });
           
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Failed! There is an existing account with this Email");
    });
    
});

describe('signin with google Test', () => {
    it('Should retrive user and token from database', async () => {
        const signinUser = {
            googleId :"111"
        }
        const res = await request.post("/OAuth/google/signin")
            .send(signinUser);

        // Searches the user in the database
        await User.findOne({ googleId: signinUser.googleId })
        .exec((err, user) => {
            expect(res.status).toBe(200);
            expect(res.body.accessToken).toBeTruthy();
            expect(user.googleId).toBe(signinUser.googleId);
        });
    });
    it('Should give 404 as user not found', async () => {
        const signinUser = {
            googleId :"222"
        }
        const res = await request.post("/OAuth/google/signin")
            .send(signinUser);

        // Searches the user in the database
        await User.findOne({ googleId: signinUser.googleId })
        .exec((err, user) => {
            expect(res.status).toBe(404);
            expect(res.body.message).toBe("User Not found.");
        });
    });
});

