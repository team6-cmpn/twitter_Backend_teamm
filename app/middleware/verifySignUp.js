require("dotenv").config();
const db = require("../models");
const User = db.user;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

//const phoneNumber = process.argv[2];



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
    if(req.body.email){
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
      
    }
    //check phonenumber
    else if(req.body.phoneNumber){
      User.findOne({
        phoneNumber: req.body.phoneNumber
      }).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (user) {
          res.status(400).send({ message: "Failed! There is an existing account with this phoneNumber" });
          return;
        }
        
        next();
      });
      
      
    }else{next();}
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

checkValidUsername = (req, res, next) => {
  if(req.body.username){
    var checkUsername = /^[a-zA-Z0-9.\-_$@*!]{3,30}$/;
    if (!(checkUsername.test(req.body.username) && req.body.username[0] == '@')){
      res.status(400).send({ message: "Failed! Username must start with @ and has no spaces or commas!" });
      return;
    }
    	
  }
  next();
};

checkValidEmail = (req, res, next) => {
  if(req.body.email){
  const checkEmail = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  const isValid = checkEmail.test(String(req.body.email).toLowerCase());
  if (!isValid){
    res.status(400).send({ message: "Failed! Email not valied!" });
    return;
  }
  }
  next();
};

checkValidPhoneNumber = (req, res, next) => {
  
  if(req.body.phoneNumber){
    var text = req.body.phoneNumber;
    if (text.length == 13 && text[0]=='+' && text[1]=='2'  && text[2] == '0' && text[3] == '1' && (text[4]== '0' || text[4]== '1' || text[4]== '2' || text[4]== '5') &&  
    !isNaN(text.substring(1))   ){
      
      console.log("valied");
    }else{
      res.status(400).send({ message: "Failed! phone number not valied!" });
      return;
    }
    
  }
  next();
  
}

checkAllowedAge = (req, res, next) => {
  if(req.body.dateOfBirth){
    var today = new Date();
    var birthDate = new Date(req.body.dateOfBirth);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    console.log(age);
  if (age < 13){
    res.status(400).send({ message: "Failed! You are under 13 years old!" });
    return;
  }
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
  checkValidUsername,
  checkValidEmail,
  checkValidPhoneNumber,
  checkAllowedAge,
  checkStrenghtOfPassword
};
module.exports = verifySignUp;