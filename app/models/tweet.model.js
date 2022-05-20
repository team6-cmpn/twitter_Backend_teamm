const { string } = require("joi");
const mongoose = require("mongoose");
const User = require("./user.model")
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
    created_at: {
      type: Date,
      default: new Date()
    },
    // id: {
    //     type: Number,
    //     required: true
    // },
    text: {
        type: String,
        required: true,
        maxlength: 280
    },
    source: {
        type: String
    },
    truncated: {
        type: Boolean
    },
    in_reply_to_tweet_id:{
        type: Number
    },
    in_reply_to_username:{
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    quoted_tweet_id: Boolean,
    quoted_tweet: {
        type: Schema.Types.ObjectId,
        ref: "Tweet"
    },
    quote_count : Number,
    reply_count : Number,
    retweet_count: Number,
    favorite_count: Number,
    entities: {
        type: Schema.Types.ObjectId,
        ref: 'Entities'
    },
    extended_entities: {
        type: Schema.Types.ObjectId,
        ref: 'Extended_Entities'
    },
    favorited: Boolean,
    hasImage: Boolean,
    imageUrl: [
        {
        type: String
        }
    ],
    retweeted: Boolean,
    favorites:[
        {
          type: Schema.Types.ObjectId,
          ref:"User"
        }
      ],
    mention: {
    type: String
    },
    username:{
        type: String
    },
    retweetUsers:[
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    retweetData:{
        type: Schema.Types.ObjectId,
        ref: "Tweet"
    },
    mentionedUser:{
        type: Schema.Types.ObjectId,
        ref: 'User'    
    },
});

 tweetSchema.methods.toJSON = function() {
  var tweet = this.toObject();
  return tweet;
};
module.exports = mongoose.model("Tweet", tweetSchema);
