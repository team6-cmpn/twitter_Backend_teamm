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

  created_at: {
    type: Date,
    default: new Date()
  },

notificationHeader:{
images:  [{type: String}],
text: String
},

notificationContent:{
  type: Schema.Types.ObjectId,
  ref:"Tweet"
},

userRecivedNotification: [
  {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
],


})


notificationSchema.methods.toJSON = function() {
  var notification = this.toObject();
  return notification;
};

module.exports = mongoose.model("Notification", notificationSchema );
