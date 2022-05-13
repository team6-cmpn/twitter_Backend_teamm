require("dotenv").config();
const db = require("../models");
const User = db.user;
const tweet = db.tweet;
const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
    apiKey: process.env.SMS_KEY,
    apiSecret: process.env.SMS_SECRET
})

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

exports.sendSMS = async (from, to, text) => {
    // const userFound = await db.tweet.find({});
    // console.log(userFound);
    // return userFound;

    const result = await client.messages
    .create({
        body: text,
        from: process.env.TWILIO_PHONENUMBER,
        to: to
    })
    .then(message => {
        //return message;
        //console.log(message)
        // var response;
        // return message.errorMessage;
        if (message.errorMessage){
            //console.log(message.errorMessage);
            return false;
        }else{
            //console.log(message)
            return true;
            
        }
    });
    console.log(result);
}

const sendSMS1 = async (from, to, text, emailToken , message ,req, res) => {
    await vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if(responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
                //res.status(200).send({ message: message, emailtoken: emailToken });
                return true;
            } else {
                    console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                    //res.status(500).send({ message: `sms didn't send error: ${responseData.messages[0]['error-text']}`});
                    return false;
                }
            }
    })
}
//module.exports = sendSMS;