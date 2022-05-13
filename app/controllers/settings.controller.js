require("dotenv").config();
const config = require("../config/auth.config");
const sendEmail = require("../utils/email");
const {sendSMS} = require("../utils/sms");
const {signin} = require("./auth.controller");
const db = require("../models");
const User = db.user;
var jwt  = require("jsonwebtoken");
var {TokenExpiredError}  = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

/**
 * 
 * @module  Settings
 */
/**
 * @global
 * @typedef {object} reqBodyChangePassword
 * @property {string} currentPassword 
 * @property {string} password 
 * @property {string} confirmNewPassword 
 */
/** 
 * @global
 * @typedef {object} resBodyChangePassword
 * @property {string} message password was changed successfully
 */
/**
 * This function changes the password of the user
 * 
 * @param {reqBodyChangePassword} req the request sent from the front
 * @param {resBodyChangePassword} res the response which is sent back to the front
 * 
 */

exports.changePassword = (req, res) => {
    // Q) will we user only username or will use email and phone too??? ask front
    const data = {
        currentPassword: req.body.currentPassword,
        newPassword: req.body.password,
        confirmNewPassword: req.body.confirmNewPassword
    }

  User.findOne({_id: req.userId})
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      if (!user.password){
        return res.status(400).send({ message: "This user signed up by google account and has no twitter password" });
      }
    //   if (!user.confirmed){
    //     return res.status(400).send({message:"please confirm your email before login"});
    //   }
      var passwordIsValid = bcrypt.compareSync(
        data.currentPassword,
        user.password
      );
      if ((!passwordIsValid) & (data.currentPassword != user.password)) {
        return res.status(401).send({message: "Wrong Password!"});
      }
      if (data.newPassword != data.confirmNewPassword){
        return res.status(401).send({message: "new Password and confrim password do not match"});
      }
      user.password = bcrypt.hashSync(data.newPassword, 8)
      user.save();
      res.status(200).send({message: "password was changed successfully"});
       
    });
};

/**
 * @global
 * @typedef {object} reqBodysendForgetPasswordEmail
 * @property {string} username 
 * @property {string} email 
 * 
 */
/** 
 * @global
 * @typedef {object} resBodysendForgetPasswordEmail
 * @property {string} message An Email sent to your account please click on it to reset your password
 */
/**
 * This function sends an email to user to confirm his identity to be able later to reset his password
 * 
 * @param {reqBodysendForgetPasswordEmail} req the request sent from the front
 * @param {resBodysendForgetPasswordEmail} res the response which is sent back to the front
 * 
 */

exports.sendForgetPasswordEmail = (req, res) => {
    // name , email or phone, date of birth
    //validation
    const user = new User({
      //id: req.body.id,
      username: req.body.username,
      data: req.body.data,
      //email: req.body.email,
    });

    const newVerificationCode = Math.floor(100000 + Math.random() * 900000);
    User.findOneAndUpdate({
      $or:[ {email: req.body.data},{ phoneNumber: req.body.data}]
      //email: req.body.email
      },
      {$set: {verificationCode:newVerificationCode }},{new: true})
      .exec((err, foundUser) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (!foundUser) {
          res.status(404).send({ message: "user not found" });
          return;
        }
        if (isNaN(req.body.data.substring(1))){
          const message = `please copy this confirmation code to your account to reset your password ${newVerificationCode}`;
          sendEmail(foundUser.email, "Forget Password Email", message);
        
          res.status(200).send({ message: "An Email sent to your account please click on it to reset your password" });
       
        }else {
          const from = "Twitter Team"
          const to = req.body.data
          const text = `please copy this confirmation code to your account to reset your password ${newVerificationCode} Thank you very much`;
          const isSent = sendSMS(from, to, text);
          console.log(isSent);
          if(isSent){
            res.status(200).send({ message: "A verification code was sent to your mobile phone please click on it to reset your password"});
          }else{
            res.status(500).send({ message: `sms didn't send error`});
          }
        }
      //   jwt.sign(
      //     {
      //       "id" :foundUser._id,
      //       "isDeactivated" :foundUser.isDeactivated
      //       //"username": user.username
      //     },
      //     process.env.EMAIL_SECRET,
      //     {
      //       expiresIn: '1d',
      //     },
      //     (err, emailToken) => {
      //       // send confirmation email
      //       // document.write("<h2>Hello World!</h2><p>Have a nice day!</p>");
      //       //const message = `${process.env.BASE_URL}/settings/forgetPassword/${emailToken}`;
      //       const message = `${newVerificationCode}`;
      //       sendEmail(user.email, "Forget Password Email", message);
          
      //       res.status(200).send({ message: "An Email sent to your account please click on it to reset your password" });
      //     },
      // );
    });
};

// /**
//  * @global
//  * @typedef {object} reqParamsreceiveForgetPasswordEmail
//  * @property {string} emailtoken  
//  * 
//  */
// /** 
//  * @global
//  * @typedef {object} resBodyreceiveForgetPasswordEmail
//  * @property {string} accessToken 
//  */
// /**
//  * This function confirm the user identity to be able to reset the password
//  * 
//  * @param {reqParamsreceiveForgetPasswordEmail} req the request sent from the front
//  * @param {resBodyreceiveForgetPasswordEmail} res the response which is sent back to the front
//  * 
//  */

// exports.receiveForgetPasswordEmail = (req, res) => {
//     try {
//       jwt.verify(req.params.emailtoken, process.env.EMAIL_SECRET,(err, decoded) => {
//         if (err) {
//           if (err instanceof TokenExpiredError) {
//             return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
//           }
//           return res.sendStatus(401).send({ message: "Unauthorized!" });
//         }
  
//         var token = jwt.sign({ id: decoded.id , isDeactivated: decoded.isDeactivated}, config.secret, {
//         expiresIn: config.jwtExpiration // 24 hours will be modified later
//         });

//         res.status(200).send({
//         accessToken: token
//         });
           
//       });
//     } catch (err) {
//       res.status(500).send("error in token verification in forget password email");
//     }
// }


/**
 * @global
 * @typedef {object} reqParamsreceiveForgetPasswordEmail
 * @property {string} verificationCode  
 * 
 */
/** 
 * @global
 * @typedef {object} resBodyreceiveForgetPasswordEmail
 * @property {string} accessToken 
 */
/**
 * This function confirm the user identity to be able to reset the password
 * 
 * @param {reqParamsreceiveForgetPasswordEmail} req the request sent from the front
 * @param {resBodyreceiveForgetPasswordEmail} res the response which is sent back to the front
 * 
 */

exports.receiveForgetPasswordEmail = (req, res) => {
    try {
      User.findOneAndUpdate({ verificationCode: req.body.verificationCode },{$set: {verificationCode: null}},{new: true}, (err, user) => {
        if (user){
          var token = jwt.sign({ id: user._id , isDeactivated: user.isDeactivated}, config.secret, {
            expiresIn: config.jwtExpiration // 24 hours will be modified later
          });
          
          res.status(200).send({
            accessToken: token
          });
          return;
        } else {
          res.status(401).send({message: "wrong verification code"});
          return;
        }
        
      });
    } catch (err) {
      res.status(500).send("error in token verification in forget password email");
    }
}



/**
 * @global
 * @typedef {object} reqBodyChangePassword
 * @property {string} password 
 * @property {string} confirmNewPassword 
 */
/** 
 * @global
 * @typedef {object} resBodyChangePassword
 * @property {string} message password was reset successfully
 */
/**
 * This function resets the password of the user if he forgot it
 * 
 * @param {reqBodyChangePassword} req the request sent from the front
 * @param {resBodyChangePassword} res the response which is sent back to the front
 * 
 */

exports.resetForgetPassword = (req, res) => {
    // Q) will we user only username or will use email and phone too??? ask front
    const data = {
        newPassword: req.body.password,
        confirmNewPassword: req.body.confirmNewPassword
    }

  User.findOne({_id: req.userId})
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      
      if (data.newPassword != data.confirmNewPassword){
        return res.status(401).send({message: "new Password and confrim password do not match"});
      }
      user.password = bcrypt.hashSync(data.newPassword, 8)
      user.save();
      res.status(200).send({message: "password was reset successfully"});
       
    });
};


/** 
 * @global
 * @typedef {object} resBodydeactivateAccount
 * @property {string} message your account has been decactivated successfully
 */
/**
 * This function deactivates the user account
 * 
 * @param {*} req the request sent from the front
 * @param {resBodydeactivateAccount} res the response which is sent back to the front
 * 
 */
exports.deactivateAccount = (req, res) => {

  User.findOneAndUpdate({ _id: req.userId },{$set: {isDeactivated: true , deactivationDate: new Date()} },{new: true}, (err, doc) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({message: "your account has been decactivated successfully"})
  })
}

/** 
 * @global
 * @typedef {object} reqHearderreactivateAccount
 * @property {string} token verify this token to get the user id
 */
/**
 * This function reactivates the user account after he deactivates it
 * 
 * @param {reqHearderreactivateAccount} req the request sent from the front
 * @param {*} res the response which is sent back to the front
 * 
 */
exports.reactivateAccount = (req, res) => {
  
  User.findOneAndUpdate({ _id: req.userId },{$set: {isDeactivated: false }},{new: true}, (err, doc) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    const data ={
      body:{
        data: doc.username,
        password: doc.password
      }
    }
    signin(data,res);
    //res.status(200).send({message: "your account has been recactivated successfully"})
  })
}