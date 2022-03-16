const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {
    type: Number, 
    unique: true
  },  
  description: String,
  verified:Boolean,
  protected: Boolean,
  followers_count: Number,
  followings_count: Number,
  favourites_count: Number , 
  tweets_count: Number,
  created_at: {
    type: Date,
    default: new Date()
  },
  profile_banner_url:String,
  profile_image_url: String,
  default_profile: String,
  default_profile_image:  Boolean,
  name: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    required: true
  },
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

userSchema.methods.toJSON = function() {
  var user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model("User", userSchema);