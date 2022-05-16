const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // id: {
  //   type: Number,
  //   unique: true
  // },
  name: {
    type: String,
    required: false,
    //unique: true,
    sparse: true
  },
  username: {
    type: String,
    required: true,
    //unique: true
  },
  phoneNumber: {
    type: String,
    //unique: true,
    sparse: true
  },
  email: {
    type: String,
    //unique: true
  },
  password: {
    type: String,
    //required: true
  },
  savedText:[
    {
      type: String,
    
    }
  ],
  savedUsers:Array,
  bookMarks: Array ,
  relations: [
    {
      type:Schema.Types.ObjectId,
      ref: "relations"
    }
  ],
  notifications: [
    {
      type:Schema.Types.ObjectId,
      ref: "Notification"
    }
  ],
  created_at: {
    type: Date,
    default: new Date()
  },
  dateOfBirth:{
    type: Date
  },
  confirmed:{
    type: Boolean,
    default: false
  },
  admin_block:{
  blocked_by_admin:{  type: Boolean, default: false},
  block_createdAt:{type:Date},
  block_duration: {type:Number, required: true,default:0},
  blockNumTimes: {type:Number,default:0}
  },
  isAdmin:{
    type: Boolean,
    default:false
  },
  favorites:[
    {
      type: Schema.Types.ObjectId,
      ref:"Tweet"
    }
  ],
  isDeactivated:{
    type: Boolean,
    default: false
  },
  deactivationDate: Date,
  verificationCode: String,
  googleId: String,
  description: String,
  verified:Boolean,
  protected: Boolean,
  followers_count: Number,
  followings_count: Number,
  favourites_count: Number ,
  tweets_count: Number,
  profile_banner_url:String,
  profile_image_url: String,
  default_profile: String,
  default_profile_image:  Boolean,
  retweets:[
    {
      type: Schema.Types.ObjectId,
      ref:"Tweet"
    }
  ],

});

userSchema.methods.toJSON = function() {
  var user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model("User", userSchema);
