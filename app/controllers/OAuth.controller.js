require("dotenv").config();
const config = require("../config/auth.config");
//const emailConfig = require("../config/email.config");
const sendEmail = require("../utils/email");
const db = require("../models");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

/**
 * 
 * @module OAuth
 */

/**
 * @global
 * @typedef {object} reqBodySignupGoogle
 * @property {string} googleId 
 * @property {string} imageUrl 
 * @property {string} email 
 * @property {string} name 
 * @property {string} username 
 */
/** 
 * This function signs up users using email and send them a verification email
 * Takes a patient 
 * 
 * @param {reqBodySignupGoogle} req 
 * @param {*} res 
 * 
 */
exports.signupGoogle = (req, res) => {
    // name , email or phone, date of birth
  //res.send({ message:"signup",user_Name: req.body.username});
  //console.log("in signup google");
  const user = new User({
    googleId: req.body.googleId,
    imageUrl: req.body.imageUrl,
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    confirmed: true,
    created_at : new Date()
  });
  //console.log("user info read");
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    //for signup only
    //res.status(200).send({message: "user registered successfully with google account"})
    // for sign up and automatic signin
    this.signinGoogle(req,res);
  });
  
};

/**
 * @global
 * @typedef {object} reqBodySigninGoogle
 * @property {string} googleId 
 *  
 */
/** 
 * @global
 * @typedef {object} resBodySigninGoogle
 * @property {object} user user object
 * @property {string} token the acsses token
 */
/**
 * This function signs up users using email and send them a verification email
 * Takes a patient 
 * 
 * @param {reqBodySigninGoogle} req 
 * @param {resBodySigninGoogle} res 
 * 
 */
exports.signinGoogle = (req, res) => {
   
  User.findOne({
    googleId: req.body.googleId
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration // 24 hours will be modified later
      });
      // Q) should we return all of the user object ?
      // Q) the token is saved in the user schema or we will send it alone ?
      // Q) will it be like this ->
      res.status(200).send({
        user: user,
        accessToken: token
      });
      // res.status(200).send({
      //   id: user._id,
      //   username: user.username,
      //   email: user.email,
      //   accessToken: token
      // });
    });
};