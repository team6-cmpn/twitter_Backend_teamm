const { boolean, string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const relationsSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
        unique: false
    },
    username: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },

    following:{ 
        type: Boolean,
    },
    follower:{
        type: Boolean,
    },
    blocked:{ // user_id blocked user_id
        type: Boolean,
    },
    connections:{
        type: String,
    },
    following_request_received:{
        type: Boolean,
    }, 
    following_request_send:{
        type: Boolean,
    },
    Notifications_enabled:{
        type: Boolean,
    },
    mute:{
        type: Boolean,
    },
    mute_until:{
        type: Date,
    },
    no_retweets:{
        type: Boolean
    },
    want_retweets:{
        type: Boolean,
    },
    all_replies:{
        type: Boolean,
    },
    marked_spam:{
        type: Boolean,
    },
    blocked_by:{ // user_id is blocked by user_id
        type: Boolean,
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});
  
module.exports = mongoose.model("Relation", relationsSchema);

// {
//     "user_id": "625dce80b598cd20b1ebd282",
//     "username": "admin",
//     "following":true,
//     "follower":true,
//     "blocked":false,
//     "connections":"",
//     "following_request_received":false,
//     "following_request_send":false,
//     "Notifications_enabled":true,
//     "mute":false,
//     "mute_until":"2020-04-01T00:00:00.000Z",
//     "want_retweets":false,
//     "all_replies":false,
//     "marked_spam":false,
//     "blocked_by":false,
//     "created_at": "2020-04-01T00:00:00.000Z"


// }