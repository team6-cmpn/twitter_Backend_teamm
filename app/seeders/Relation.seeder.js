const db = require("../models");
const Relation = db.relations
const { faker } = require('@faker-js/faker');
const { Seeder } = require('mongoose-data-seed');



const data2= [{
  _id: ("6284aa0eebade055f615dd12"),
  user_id : ("63643d2e864200cb48ca49d7"),
  "username": "hamada",
  "name": "hamada85",
  "following": true,
  "follower": false,
  "blocked": false,
  "following_request_received": false,
  "Notifications_enabled": true,
  "mute": false,
  "mute_until": null,
  "no_retweets": false,
  "want_retweets": true,
  "all_replies": false,
  "marked_spam": false,
  "blocked_by": null,
  "created_at": faker.date.recent(),
}]

const data1=
[{
    _id: ("6284aa0eebade055f615dd12"),
    user_id : ("63643d2e864200cb48ca49d7"),
    "username": "hamada",
    "name": "hamada85",
    "following": true,
    "follower": false,
    "blocked": false,
    "following_request_received": false,
    "Notifications_enabled": true,
    "mute": false,
    "mute_until": null,
    "no_retweets": false,
    "want_retweets": true,
    "all_replies": false,
    "marked_spam": false,
    "blocked_by": null,
    "created_at": {
      "$date": {
        "$numberLong": "1652861454846"
      }
    },
  },{

    "_id": {
      "$oid": "6284aa0eebade055f615dd08"
    },
    "user_id": {
      "$oid": "63643d2e864200cb48ca49d7"
    },
    "username": "hamada",
    "name": "hamada85",
    "following": true,
    "follower": false,
    "blocked": false,
    "following_request_received": false,
    "Notifications_enabled": true,
    "mute": false,
    "mute_until": null,
    "no_retweets": false,
    "want_retweets": true,
    "all_replies": false,
    "marked_spam": false,
    "blocked_by": null,
    "created_at": {
      "$date": {
        "$numberLong": "1652861454846"
      }
    },
    "__v": 0
  },{
    "_id": {
      "$oid": "6284aa0eebade055f615dd0c"
    },
    "user_id": {
      "$oid": "99968d2e858900ca21ca48d7"
    },
    "username": "menna",
    "name": "menna1234",
    "following": false,
    "follower": true,
    "blocked": false,
    "following_request_received": false,
    "Notifications_enabled": false,
    "mute": false,
    "mute_until": null,
    "no_retweets": false,
    "want_retweets": true,
    "all_replies": false,
    "marked_spam": false,
    "blocked_by": null,
    "created_at": {
      "$date": {
        "$numberLong": "1652861454892"
      }
    },
    "__v": 0
  },{
    "_id": {
      "$oid": "6284aaf6ebade055f615dd13"
    },
    "user_id": {
      "$oid": "63668d2e858900cb48ca48d7"
    },
    "username": "sameh",
    "name": "sam1234",
    "following": true,
    "follower": false,
    "blocked": false,
    "following_request_received": false,
    "Notifications_enabled": true,
    "mute": false,
    "mute_until": null,
    "no_retweets": false,
    "want_retweets": true,
    "all_replies": false,
    "marked_spam": false,
    "blocked_by": null,
    "created_at": {
      "$date": {
        "$numberLong": "1652861686553"
      }
    },
    "__v": 0
  },{
    "_id": {
      "$oid": "6284aaf6ebade055f615dd17"
    },
    "user_id": {
      "$oid": "99968d2e858900ca21ca48d7"
    },
    "username": "menna",
    "name": "menna1234",
    "following": false,
    "follower": true,
    "blocked": false,
    "following_request_received": false,
    "Notifications_enabled": false,
    "mute": false,
    "mute_until": null,
    "no_retweets": false,
    "want_retweets": true,
    "all_replies": false,
    "marked_spam": false,
    "blocked_by": null,
    "created_at": {
      "$date": {
        "$numberLong": "1652861686623"
      }
    },
    "__v": 0
  },{
    "_id": {
      "$oid": "6284ab10ebade055f615dd22"
    },
    "user_id": {
      "$oid": "63668d2e864200cb48ca48d7"
    },
    "username": "olaaa",
    "name": "ola1234",
    "following": true,
    "follower": false,
    "blocked": false,
    "following_request_received": false,
    "Notifications_enabled": true,
    "mute": false,
    "mute_until": null,
    "no_retweets": false,
    "want_retweets": true,
    "all_replies": false,
    "marked_spam": false,
    "blocked_by": null,
    "created_at": {
      "$date": {
        "$numberLong": "1652861712003"
      }
    },
    "__v": 0
  },{
    "_id": {
      "$oid": "6284ab10ebade055f615dd26"
    },
    "user_id": {
      "$oid": "99968d2e858900ca21ca48d7"
    },
    "username": "menna",
    "name": "menna1234",
    "following": true,
    "follower": true,
    "blocked": false,
    "following_request_received": false,
    "Notifications_enabled": false,
    "mute": false,
    "mute_until": null,
    "no_retweets": false,
    "want_retweets": true,
    "all_replies": false,
    "marked_spam": false,
    "blocked_by": null,
    "created_at": {
      "$date": {
        "$numberLong": "1652861712016"
      }
    },
    "__v": 0
  },{
    "_id": {
      "$oid": "6284ab3debade055f615dd2e"
    },
    "user_id": {
      "$oid": "63668d2e858900cb48ca48d7"
    },
    "username": "sameh",
    "name": "sam1234",
    "following": true,
    "follower": false,
    "blocked": false,
    "following_request_received": false,
    "Notifications_enabled": true,
    "mute": false,
    "mute_until": null,
    "no_retweets": false,
    "want_retweets": true,
    "all_replies": false,
    "marked_spam": false,
    "blocked_by": null,
    "created_at": {
      "$date": {
        "$numberLong": "1652861757812"
      }
    },
    "__v": 0
  },{
    "_id": {
      "$oid": "6284ab3debade055f615dd32"
    },
    "user_id": {
      "$oid": "63668d2e864200cb48ca48d7"
    },
    "username": "olaaa",
    "name": "ola1234",
    "following": false,
    "follower": true,
    "blocked": false,
    "following_request_received": false,
    "Notifications_enabled": false,
    "mute": false,
    "mute_until": null,
    "no_retweets": false,
    "want_retweets": true,
    "all_replies": false,
    "marked_spam": false,
    "blocked_by": null,
    "created_at": {
      "$date": {
        "$numberLong": "1652861757833"
      }
    },
    "__v": 0
  },{
    "_id": {
      "$oid": "6284ab56ebade055f615dd3a"
    },
    "user_id": {
      "$oid": "63643d2e864200cb48ca49d7"
    },
    "username": "hamada",
    "name": "hamada85",
    "following": true,
    "follower": false,
    "blocked": false,
    "following_request_received": false,
    "Notifications_enabled": true,
    "mute": false,
    "mute_until": null,
    "no_retweets": false,
    "want_retweets": true,
    "all_replies": false,
    "marked_spam": false,
    "blocked_by": null,
    "created_at": {
      "$date": {
        "$numberLong": "1652861782027"
      }
    },
    "__v": 0
  },{
    "_id": {
      "$oid": "6284ab56ebade055f615dd3e"
    },
    "user_id": {
      "$oid": "63668d2e864200cb48ca48d7"
    },
    "username": "olaaa",
    "name": "ola1234",
    "following": false,
    "follower": true,
    "blocked": false,
    "following_request_received": false,
    "Notifications_enabled": false,
    "mute": false,
    "mute_until": null,
    "no_retweets": false,
    "want_retweets": true,
    "all_replies": false,
    "marked_spam": false,
    "blocked_by": null,
    "created_at": {
      "$date": {
        "$numberLong": "1652861782046"
      }
    },
    "__v": 0
  }]


class RelationsSeeder extends Seeder {
    async shouldRun() {
        return Relation.countDocuments()
        .exec()
        //.then(count => count === 0);
    }

    async run() {
        return Relation.create(data);
    }
}

module.exports = RelationsSeeder;
  