const db = require("../models");
const User = db.user;
const { faker } = require('@faker-js/faker');
const { Seeder } = require('mongoose-data-seed');


const data=
[

  {
      _id : ("63643d2e864200cb48ca49d7"),
      username : "@hamada",
      name : "hamada85",
      email : "baawxlo34@vxjidzfsaq.com",
      password : "$2a$08$kBW2wS9uCc0g5NPVnAR7hupup6pUqYxvM7IJEb8KFRQKmV3Jmtyii",
      followers_count : 150,
      following : [],
      favorites : [
        "4282689f3072026523ba8c16",
        "6282689f3072026523ba8c12",
      ],
      retweets : [
        "4282689f3072026523ba8c16",
        "6282689f3072026523ba8c12",
      ],
      admin_block : {
          blocked_by_admin : false,
          blockNumTimes : 0
      },
      isAdmin : false,
      confirmed : true,

  },


    {
        _id : ("63668d2e864200cb48ca48d7"),
        username : "@olaaa",
        name : "ola1234",
        email : "bwawxso34@vxjidzfopq.com",
        password : "$2a$08$kBW2wS9uCc0g5NPVnAR7hupup6pUqYxvM7IJEb8KFRQKmV3Jmtyii",
        followers_count : 150,
        following : [],
        favorites : [
          "2282689f3072026523ba8c11",
          "4282689f3072026523ba8c11",
          "4282689f3072026523ba8c12",
          "6282689f3072026523ba8c11",
        ],
        retweets : [
          "2282689f3072026523ba8c11",
          "4282689f3072026523ba8c11",
          "4282689f3072026523ba8c12",
          "6282689f3072026523ba8c11",
        ],
        admin_block : {
            blocked_by_admin : false,
            blockNumTimes : 0
        },
        isAdmin : true,
        confirmed : true,

    },

    {
        _id : ("63668d2e858900cb48ca48d7"),
        username : "@sameh",
        name : "sam1234",
        email : "bwauzso34@vxjidzfopq.com",
        password : "$2a$08$kBW2wS9uCc0g5NPVnAR7hupup6pUqYxvM7IJEb8KFRQKmV3Jmtyii",
        followers_count : 150,
        following : [],
        favorites : [
          "1282689f3072026523ba8c14",
          "2282689f3072026523ba8c11",
          "3282689f3072026523ba8c13",
          "5282689f3072026523ba8c12",
        ],
        retweets : [
          "1282689f3072026523ba8c14",
          "2282689f3072026523ba8c11",
          "3282689f3072026523ba8c13",
          "5282689f3072026523ba8c12",
        ],
        admin_block : {
            blocked_by_admin : true,
            block_duration : 1000,
            blockNumTimes : 0
        },
        isAdmin : false,
        confirmed : true,

    },



    {
        _id : ("99968d2e858900ca21ca48d7"),
        username : "@menna",
        name : "menna1234",
        email : "bwauaso34@vxjizzfopq.com",
        password : "$2a$08$kBW2wS9uCc0g5NPVnAR7hupup6pUqYxvM7IJEb8KFRQKmV3Jmtyii",
        followers_count : 150,
        favorites : [
          "1282689f3072026523ba8c11",
          "1282689f3072026523ba8c12",
          "3282689f3072026523ba8c11",
          "4282689f3072026523ba8c11",
        ],
        retweets : [
          "1282689f3072026523ba8c11",
          "1282689f3072026523ba8c12",
          "3282689f3072026523ba8c11",
        ],
        following : [],
        admin_block : {
            blocked_by_admin : true,
            block_duration : 1000,
            blockNumTimes : 0,
              block_createdAt: faker.date.recent() ,
        },
        isAdmin : false,
        confirmed : true,
    },
    {
      _id : "627adec1ceb4dc5e91fe221c",
      username : "@mahmo1234",
      name : "mahmoud",
      email : "mahmoud.ahmed44447@yahoo.com",
      password : "$2a$08$kBW2wS9uCc0g5NPVnAR7hupup6pUqYxvM7IJEb8KFRQKmV3Jmtyii",
      followers : [],
      following : [],
      favorites :[
        "1282689f3072026523ba8c11",
        "1282689f3072026523ba8c12",
        "2282689f3072026523ba8c11",
        "4282689f3072026523ba8c14",
      ],
      retweets :[
        "1282689f3072026523ba8c11",
        "1282689f3072026523ba8c12",
        "2282689f3072026523ba8c11",
        "4282689f3072026523ba8c14",
      ],
      followers_count : 150,
      admin_block : {
          blocked_by_admin : false,
          blockNumTimes : 0,
      },
      isAdmin : false,
      confirmed : true,
    },
    {
      _id : "627bc927592c6d120dcc126b",
      username : "@farah",
      name : "Farah Ossama",
      email : "farahossama.123@gmail.com",
      password : "$2a$08$kBW2wS9uCc0g5NPVnAR7hupup6pUqYxvM7IJEb8KFRQKmV3Jmtyii",
      followers : [],
      following : [],
      favorites :[
        "1282689f3072026523ba8c11",
        "1282689f3072026523ba8c13",
        "2282689f3072026523ba8c11",
        "3282689f3072026523ba8c11",
      ],
      retweets :[
        "1282689f3072026523ba8c11",
        "1282689f3072026523ba8c13",
        "2282689f3072026523ba8c11",
        "3282689f3072026523ba8c11",
      ],
      followers_count : 50,
      admin_block : {
          blocked_by_admin : false,
          blockNumTimes : 0,
      },
      isAdmin : false,
      confirmed : true,
    },
    {
      _id : "627f964d055a48cb594004c5",
      username : "@farida",
      name : "Farida",
      email : "khadigaossama.123@gmail.com",
      password : "$2a$08$kBW2wS9uCc0g5NPVnAR7hupup6pUqYxvM7IJEb8KFRQKmV3Jmtyii",
      followers : [],
      following : [],
      favorites :[
        "2282689f3072026523ba8c11",
        "5282689f3072026523ba8c11",
      ],
      retweets :[
        "2282689f3072026523ba8c11",
        "5282689f3072026523ba8c11",
      ],
      followers_count : 50,
      admin_block : {
          blocked_by_admin : false,
          blockNumTimes : 0,
      },
      isAdmin : false,
      confirmed : true,
    },
    {
      _id : "62829a10d7a2423a544f527d",
      username : "@fathyJr20",
      name : "Fathy",
      email : "jwt03076@zcrcd.com",
      password : "$2a$08$kBW2wS9uCc0g5NPVnAR7hupup6pUqYxvM7IJEb8KFRQKmV3Jmtyii",
      followers : [],
      following : [],
      favorites :[
        "1282689f3072026523ba8c11",
        "1282689f3072026523ba8c13",
        "2282689f3072026523ba8c11",
        "3282689f3072026523ba8c11",
      ],
      retweets :[
        "1282689f3072026523ba8c11",
        "1282689f3072026523ba8c13",
        "2282689f3072026523ba8c11",
        "3282689f3072026523ba8c11",
      ],
      followers_count : 50,
      admin_block : {
          blocked_by_admin : false,
          blockNumTimes : 0,
      },
      isAdmin : false,
      confirmed : true,
    },

    
]


class UsersSeeder extends Seeder {
  async shouldRun() {
    return User.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return User.create(data);
  }
}

module.exports = UsersSeeder;
