require("dotenv").config();
const config = require("../config/auth.config");
//const emailConfig = require("../config/email.config");
const sendEmail = require("../utils/email");
const db = require("../models");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signupGoogle = (req, res) => {
    // name , email or phone, date of birth
  //res.send({ message:"signup",user_Name: req.body.username});
  const user = new User({
    googleId: req.body.googleId,
    imageUrl: req.body.imageUrl,
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    confirmed: true
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({message: "user registered successfully with google account"})
  });
  //generate email token
  //console.log(user);
  //res.redirect("/OAuth/google/signin");
};


exports.signinGoogle = (req, res) => {
    // Q) will we user only username or will use email and phone too??? ask front
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