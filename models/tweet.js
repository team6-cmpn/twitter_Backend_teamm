const mongoose = require("mongoose");
const User = require("./user")
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
    created_at: {
      type: String,
      default: new Date()
    },
    id: {
        type: Number,
        required: true
    },
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
    in_reply_to_status_id:{
        type: Number
    },
    in_reply_to_screen_name:{
        type: String
    },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    quoted_status_id: Boolean,
    quoted_status: { 
        type: Schema.Types.ObjectId, 
        ref: "Tweet" 
    },
    quote_count : Number,
    reply_count : Number,
    retweet_count: Number,
    favorite_count: Number,
    entities: { 
        type: Schema.Types.ObjectId, 
        ref: 'Entity' 
    },
    extended_entities: { 
        type: Schema.Types.ObjectId, 
        ref: 'Extended-Entity' 
    },
    favorited: Boolean,
    retweeted: Boolean,
});

module.exports = mongoose.model("Tweet", tweetSchema);