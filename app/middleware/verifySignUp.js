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

checkStrenghtOfPassword = (req, res, next) => {
  const strongPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  const isStrong = strongPassword.test(req.body.password);
  if (!isStrong){
    res.status(400).send({ message: "Failed! password must be 8 or more characters which contain at least one numeric digit, one uppercase and one lowercase letter" });
    return;
  }
  next();
};

checkValidEmail = (req, res, next) => {
  const checkEmail = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  const isValid = checkEmail.test(String(req.body.email).toLowerCase());
  if (!isValid){
    res.status(400).send({ message: "Failed! Email not valied!" });
    return;
  }
  next();
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
  checkExistingGoogleId,
  checkValidEmail,
  checkStrenghtOfPassword
};
module.exports = verifySignUp;