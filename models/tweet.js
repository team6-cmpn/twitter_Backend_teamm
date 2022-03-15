const mongoose = require("mongoose");
const User = require("./user")
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
    created_at: {
      type: String,
      default: new Date()
    },
    id: {
        type: int64,
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
        type: boolean
    },
    in_reply_to_status_id:{
        type: int64
    },
    in_reply_to_screen_name:{
        type: String
    },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    quoted_status_id: boolean,
    quoted_status: { 
        type: Schema.Types.ObjectId, 
        ref: "Tweet" 
    },
    quote_count : integer,
    reply_count : int,
    retweet_count: int,
    favorite_count: int,
    entities: { 
        type: Schema.Types.ObjectId, 
        ref: 'Entity' 
    },
    extended_entities: { 
        type: Schema.Types.ObjectId, 
        ref: 'Extended-Entity' 
    },
    favorited: boolean,
    retweeted: boolean,
});

module.exports = mongoose.model("Tweet", tweetSchema);