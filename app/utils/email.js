require("dotenv").config();
const nodemailer = require("nodemailer");
const emailConfig = require("../config/email.config.js");

const sendEmail = async (email, subject, text) => {
  try {
    //create transporter 
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    
    //verify transporter
    transporter.verify((err,success)=>{
      // if(err){
      //   console.log("transporter error");
      //   console.log(err);
      // }else{
      //   console.log("ready for message");
      //   console.log(success);
      // }
    })
    // send mail
    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });
    //console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

module.exports = sendEmail;