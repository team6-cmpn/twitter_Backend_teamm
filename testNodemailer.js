"use strict";
const nodemailer = require("nodemailer");
const { getMaxListeners } = require("./app/models/user.model");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "lolosoftwaretest@gmail.com", // generated ethereal user
      pass: "lolosoftwaretest2000" // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"loco lolo 👻" <confirmationEmail@gmail.com>', // sender address
    to: "ins10484@uooos.com", // list of receivers
    subject: "Twitter confirmation email", // Subject line
    text: "please confirm your mail", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
