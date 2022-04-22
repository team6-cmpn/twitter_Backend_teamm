require("dotenv").config();
const config = require("../config/auth.config");
const sendEmail = require("../utils/email");
const db = require("../models");
const User = db.user;
var jwt  = require("jsonwebtoken");
var {TokenExpiredError}  = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

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
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth,
    password: bcrypt.hashSync(req.body.password, 8),
    created_at : new Date(),
    verificationCode: Math.floor(100000 + Math.random() * 900000)
  });
  user.save((err, user) => {
    if (err) {
      //console.log(err);
      res.status(500).send({ message: err });
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
      const message = `<p>You have a new email comfirmation request</p>
      <p>Please copy this verification code to confirm your email: ${user.verificationCode}</p>
      <p>Thank you very much</p>`;
      sendEmail(user.email, "Confirm Email", message);
      res.status(200).send({ message: "An Email sent to your account please verify", emailtoken: emailToken });
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
    });
    res.status(200).send({message :"user has been confirmed successfully"});
    
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