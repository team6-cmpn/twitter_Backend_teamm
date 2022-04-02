const db = require("../models");
const User = db.user;

checkExistingUsernameOrEmail = (req, res, next) => {
  // check Username
  //res.send({message:"verifySignUp", user_name: req.body});
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: "Failed! There is an existing account with this Username" });
      return;
    }
    // check Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res.status(400).send({ message: "Failed! There is an existing account with this Email" });
        return;
      }
      next();
    });
  });
};
checkExistingGoogleId = (req, res, next) => {
  // check Username
  //res.send({message:"verifySignUp", user_name: req.body});
  User.findOne({
    googleId: req.body.googleId
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: "Failed! There is an existing account with this google id" });
      return;
    }
    next();
  });
  
};

const verifySignUp = {
  checkExistingUsernameOrEmail,
  checkExistingGoogleId
};
module.exports = verifySignUp;