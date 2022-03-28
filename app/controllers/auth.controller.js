require("dotenv").config();
const config = require("../config/auth.config");
const sendEmail = require("../utils/email");
const db = require("../models");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // name , email or phone, date of birth
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth,
    password: bcrypt.hashSync(req.body.password, 8)
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
  });
  //generate email token
  // remove the password from jwt.sign if not redirecting
  jwt.sign(
    {
      "id" :user._id,
      "username" : user.username,
      "password" :user.password,
    },
    process.env.EMAIL_SECRET,
    {
      expiresIn: '1d',
    },
    (err, emailToken) => {
      // send confirmation email
      // document.write("<h2>Hello World!</h2><p>Have a nice day!</p>");
      const message = `<p>You have a new email comfirmation request</p>
      <p>Please click this email to confirm your email:</p>
      <a href="${process.env.BASE_URL}/auth/confirmation/${emailToken}">click here to confirm your email</a>
      <p>Thank you very much</p>`;
      sendEmail(user.email, "Confirm Email", message);
    
      res.status(200).send("An Email sent to your account please verify");
    },
  );
};

exports.confirmEmail = (req, res) => {
  try {
    jwt.verify(req.params.emailtoken, process.env.EMAIL_SECRET,(err, decoded) => {
      if (err) {
        if (err instanceof TokenExpiredError) {
          return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
        }
        return res.sendStatus(401).send({ message: "Unauthorized!" });
      }

      User.findOneAndUpdate({ _id: decoded.id },{$set: {confirmed: true }},{new: true}, (err, doc) => {
        //console.log(doc);
      });
      // remove the following if you don't want to redirect
      const data ={
        body:{
          data: decoded.username,
          password: decoded.password
        }
      }
      this.signin(data,res);
      
    });
  } catch (err) {
    res.send("error in token verification in confirmation email");
  }

  //return res.status(200).send({message: "user email is successfully confirmed"});
}

exports.signin = (req, res) => {
    // Q) will we user only username or will use email and phone too??? ask front
  User.findOne({
    //username: req.body.username,
    //email: req.body.email
    $or:[ {email: req.body.data},{username: req.body.data},{ phoneNumber: req.body.data}]
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      if (!user.confirmed){
        return res.status(400).send({message:"please confirm your email before login"});
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      // if (!passwordIsValid) {
      //   return res.status(401).send({
      //     accessToken: null,
      //     message: "Wrong Password!"
      //   });
      // }
      if ((!passwordIsValid) & (req.body.password != user.password)) {
        return res.status(401).send({
          accessToken: null,
          message: "Wrong Password!"
        });
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
    });
};