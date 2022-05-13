require("dotenv").config();
const nodemailer = require("nodemailer");
const emailConfig = require("../config/email.config.js");

const sendEmail = async (email, subject, text) => {
  try {
    //create transporter 
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: "lolosoftwaretest@gmail.com",
        pass: "lolosoftwaretest2000",
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
      from: "lolosoftwaretest@gmail.com",
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