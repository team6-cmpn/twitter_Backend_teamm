require("dotenv").config();
const config = require("../config/auth.config");
const sendEmail = require("../utils/email");
const {sendSMS} = require("../utils/sms");
const db = require("../models");
const User = db.user;
var jwt  = require("jsonwebtoken");
var {TokenExpiredError}  = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const Vonage = require('@vonage/server-sdk')



/**
 * 
 * @module auth
 */
/**
 * @global
 * @typedef {object} requestBodySignupEmail
 * @property {string} name this is name in request body
 * @property {string} username this is username in request body
 * @property {string} email this is email in request body
 * @property {string} phoneNumber this is phone number in request body
 * @property {string} password this is password in request body
 * @property {Date} dateOfBirth this is date of birth in request body
 */
/** 
 * @global
 * @typedef {object} responseBodySignupEmail
 * @property {string} message An Email sent to your account please verify
 * @property {string} emailtoken email token to help in resending confirmation email if failed
 */
/**
 * This function signs up users using email and send them a verification email
 * Takes a patient 
 * 
 * @param {requestBodySignupEmail} req the request sent from the front
 * @param {responseBodySignupEmail} res the response which is sent back to the front
 * 
 */
exports.signup = function signup(req, res) {
  // name , email or phone, date of birth
  //validation
  //added phone to user object
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    dateOfBirth: req.body.dateOfBirth,
    password: bcrypt.hashSync(req.body.password, 8),
    created_at : new Date(),
    verificationCode: Math.floor(100000 + Math.random() * 900000)
  });
  user.save((err, user) => {
    if (err) {
      console.log(err);
      //res.status(500).send({ message: err });
      return;
    }
  });
  //generate email token
  // remove the password from jwt.sign if not redirecting
  // sendEmail(user.email, "Confirm Email", message);
  // res.status(200).send({ message: "An Email sent to your account please verify", emailtoken: emailToken });
  jwt.sign(
    {
      "id" :user._id,
      "username" : user.username,
      "password" :user.password,
      "email" : user.email
    },
    process.env.EMAIL_SECRET,
    {
      expiresIn: '1d',
    },
    (err, emailToken) => {
      // send confirmation email
      // document.write("<h2>Hello World!</h2><p>Have a nice day!</p>");
      // const message = `<p>You have a new email comfirmation request</p>
      // <p>Please click this email to confirm your email:</p>
      // <a href="${process.env.BASE_URL}/auth/confirmation/${emailToken}">click here to confirm your email</a>
      // <p>Thank you very much</p>`;
      if (req.body.email){
        const message = `<p>You have a new email comfirmation request</p>
        <p>Please copy this verification code to confirm your email: ${user.verificationCode}</p>
        <p>Thank you very much</p>`;
        sendEmail(user.email, "Confirm Email", message);
        res.status(200).send({ message: "An Email sent to your account please verify", emailtoken: emailToken });
      }
      else if (req.body.phoneNumber){
        const from = "Twitter Team"
        const to = req.body.phoneNumber
        const text = `Please copy this verification code to confirm your mobile phone: ${user.verificationCode} Thank you very much`;
        const message = "A verification code was sent to your mobile phone please verify";
        const isSent = sendSMS(from, to, text );
        console.log(isSent);
        if(isSent){
          res.status(200).send({ message: message, emailtoken: emailToken });
        }else{
          res.status(500).send({ message: `sms didn't send error`});
        }
        // vonage.message.sendSms(from, to, text, (err, responseData) => {
          //     if (err) {
            //         console.log(err);
            //     } else {
              //         if(responseData.messages[0]['status'] === "0") {
                //             console.log("Message sent successfully.");
                //             res.status(200).send({ message: "A verification code was sent to your mobile phone please verify", emailtoken: emailToken });
                
                //         } else {
                  //             console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                  //             res.status(500).send({ message: `sms didn't send error: ${responseData.messages[0]['error-text']}`});
                  
                  //           }
                  //     }
                  // })
                  
                  
                  //res.status(200).send({ message: "A verification code was sent to your mobile phone please verify", emailtoken: emailToken });
                }
              },
              );
  };
/** 
 * @global
 * @typedef {object} resBodyResendEmail
 * @property {string} message An Email is resent to your account please verify
 * @property {string} emailtoken email token to help in resending confirmation email if failed
 */
/**
 * This function resends confirmation email if there was a problem with user mail box 
 * 
 * @param {*} req the request sent from the front
 * @param {resBodyResendEmail} res the response which is sent back to the front
 * 
 */

exports.resendEmail = (req, res) => {
  try {
    jwt.verify( req.headers["x-access-token"], process.env.EMAIL_SECRET,(err, decoded) => {
      if (err) {
        if (err instanceof TokenExpiredError) {
          return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
        }
        return res.sendStatus(401).send({ message: "Unauthorized!" });
      }
      
      const newEmailtoken = jwt.sign(
        { 
          "id" :decoded.id,
          "username" : decoded.username,
          "password" :decoded.password,
          "email" : decoded.email 
        }, 
        process.env.EMAIL_SECRET, {
          expiresIn: '1d' 
        });
        const newVerificationCode = Math.floor(100000 + Math.random() * 900000);
        User.findOneAndUpdate({ _id: decoded.id },{$set: {verificationCode:newVerificationCode }},{new: true}, (err, user) => {
          console.log(user);
          const message = `<p>You have a new email comfirmation request</p>
          <p>Please copy this verification code to confirm your email: ${newVerificationCode}</p>
          <p>Thank you very much</p>`;
          sendEmail(decoded.email, "Confirm Email", message);
          res.status(200).send({ message: "An Email is resent to your account please verify", emailtoken: newEmailtoken });
        });
        // const message = `<p>You have a new email comfirmation request</p>
        // <p>Please click this email to confirm your email:</p>
        // <a href="${process.env.BASE_URL}/auth/confirmation/${newEmailtoken}">click here to confirm your email</a>
        // <p>Thank you very much</p>`;
        
      });
    } catch (err) {
      res.status(500).send("error in token verification in resend email");
    }
    
  }
  /** 
   * @global
   * @typedef {object} resBodyResendSMS
   * @property {string} message An Email is resent to your account please verify
   * @property {string} emailtoken email token to help in resending confirmation email if failed
   */
  /**
   * This function resends confirmation email if there was a problem with user mail box 
   * 
   * @param {*} req the request sent from the front
   * @param {resBodyResendSMS} res the response which is sent back to the front
   * 
   */
  
  exports.resendSMS = async (req, res) => {
    try {
      await jwt.verify( req.headers["x-access-token"], process.env.EMAIL_SECRET,(err, decoded) => {
        if (err) {
          if (err instanceof TokenExpiredError) {
            return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
          }
          return res.sendStatus(401).send({ message: "Unauthorized!" });
        }
        
        const newSMStoken = jwt.sign(
          { 
            "id" :decoded.id,
            "username" : decoded.username,
            "password" :decoded.password,
            "email" : decoded.email 
          }, 
          process.env.EMAIL_SECRET, {
            expiresIn: '1d' 
          });
          const newVerificationCode = Math.floor(100000 + Math.random() * 900000);
          User.findOneAndUpdate({ _id: decoded.id },{$set: {verificationCode:newVerificationCode }},{new: true}, (err, user) => {
            console.log(user);
            const from = "Twitter Team"
            const to = user.phoneNumber
            const text = `Please copy this verification code to confirm your mobile phone: ${newVerificationCode} Thank you very much`;
            const message = "A verification code was resent to your mobile phone please verify";
            const isSent = sendSMS(from, to, text );
            console.log(isSent);
            if(isSent){
              res.status(200).send({ message: message, emailtoken: newSMStoken });
            }else{
              res.status(500).send({ message: `sms didn't send error`});
            }
            //sendSMS(from, to, text , newSMStoken, message, req,res);
            //res.status(200).send({ message: "An Email is resent to your account please verify", emailtoken: newSMStoken });
        });
        // const message = `<p>You have a new email comfirmation request</p>
        // <p>Please click this email to confirm your email:</p>
        // <a href="${process.env.BASE_URL}/auth/confirmation/${newEmailtoken}">click here to confirm your email</a>
        // <p>Thank you very much</p>`;

  });
  } catch (err) {
    res.status(500).send("error in token verification in resend email");
  }

}

/**
 * @global
 * @typedef reqBodyConfirm
 * @property {string} verificationCode
 *
 */

/**
 * This function confirm the email and set hte user confirmed = true
 * @param {reqBodyConfirm} req 
 * @param {*} res 
 */
exports.confirmEmail = (req, res) => {
  try {
    User.findOneAndUpdate({ verificationCode: req.body.verificationCode },{$set: {confirmed: true , verificationCode: null}},{new: true}, (err, doc) => {
      //console.log(doc);
      if(doc){
        res.status(200).send({message :"user has been confirmed successfully"});
        return;
      } else {
        res.status(401).send({message :"wrong verification code"});
        return;
      }
    });
    
  } catch (err) {
    res.status(500).send("error in token verification in confirmation email");
  }
}

// /**
//  * @global
//  * @typedef reqParamsConfirm
//  * @property {string} emailtoken
//  *
//  */

// /**
//  * This function confirm the email and set hte user confirmed = true
//  * @param {reqParamsConfirm} req 
//  * @param {*} res 
//  */
// exports.confirmEmail = (req, res) => {
//   try {
//     jwt.verify(req.params.emailtoken, process.env.EMAIL_SECRET,(err, decoded) => {
//       if (err) {
//         if (err instanceof TokenExpiredError) {
//           return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
//         }
//         return res.sendStatus(401).send({ message: "Unauthorized!" });
//       }

//       User.findOneAndUpdate({ _id: decoded.id },{$set: {confirmed: true }},{new: true}, (err, doc) => {
//         //console.log(doc);
//       });
//       // remove the following if you don't want to redirect
//       const data ={
//         body:{
//           data: decoded.username,
//           password: decoded.password
//         }
//       }
//       //this.signin(data,res);
//       res.status(200).send({message :"user has been confirmed successfully"});
      
//     });
//   } catch (err) {
//     res.status(500).send("error in token verification in confirmation email");
//   }

//   //return res.status(200).send({message: "user email is successfully confirmed"});
// }

/** 
 * @global
 * @typedef {object} reqBodySigninEmail
 * @property {string} data username , email or phone
 * @property {string} password user password
 */
/** 
 * @global
 * @typedef {object} resBodySigninEmail
 * @property {object} user user object
 * @property {string} token the acsses token
 */
/**
 * This function signs in users using email, username or phone number
 * 
 * @param {reqBodySigninEmail} req the request sent from the front
 * @param {resBodySigninEmail} res the response which is sent back to the front
 * 
 */
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
      var token = jwt.sign({ id: user._id , isDeactivated: user.isDeactivated}, config.secret, {
        expiresIn: config.jwtExpiration // 24 hours will be modified later
      });
      // Q) should we return all of the user object ?
      // Q) the token is saved in the user schema or we will send it alone ?
      // Q) will it be like this ->
      if (user.isDeactivated){
        return res.status(400).send({
          message:"This account is deactivated!",
          accessToken: token
        });
      }else{
        res.status(200).send({
          user: user,
          accessToken: token
        });
      }
    });
};