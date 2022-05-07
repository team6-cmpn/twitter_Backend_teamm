const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user.model")
const Tweet = require("./tweet.model")


const notificationSchema = new Schema({


  notificationType: {
      type: String,
      required: true
  },

notificationHeader:{
  type: String,
  required: true
},

notificationContent:{
  type: String,
},

user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
},

tweet: {
    type: Schema.Types.ObjectId,
    ref: 'User'
},

})


notificationSchema.methods.toJSON = function() {
  var notification = this.toObject();
  return notification;
};

module.exports = mongoose.model("Notification", notificationSchema );
