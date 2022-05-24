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
      relations : [
        "2285e4a887c630a36bbe8473", 
        "7285e4a887c630a36bbe8473"
      ],
      savedText: ["cats","dogs","@fda"], 
      savedUsers:["63668d2e864200cb48ca48d7"],

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
        relations : [ 
          "3285e4a887c630a36bbe8473", 
          "9085e4a887c630a36bbe8473", 
          "6485e4a887c630a36bbe8473", 
          "6205e4a887c630a36bbe8473" 
        ],
        savedText: ["cr7","tesla","@fda"],
        savedUsers:[
          "63668d2e858900cb48ca48d7", 
          "99968d2e858900ca21ca48d7", 
          "627adec1ceb4dc5e91fe221c", 
          "62829a10d7a2423a544f527d"],


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
        relations : [ 
          "4285e4a887c630a36bbe8473", 
          "6385e4a887c630a36bbe8473"
        ],
        savedText: ["fathy","tesla","farah","pierre","rana"],
        savedUsers:[],

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
        relations : [ 
          "6285e4a887c630a36bbe8473", 
          "6685e4a887c630a36bbe8473", 
          "6885e4a887c630a36bbe8473"
        ],
        savedText: ["ii","farida","tt","any","@ammar","@maker","hhh","@jgjjjj"],
        savedUsers:[
          "63668d2e858900cb48ca48d7", 
          "627adec1ceb4dc5e91fe221c", 
          "62829a10d7a2423a544f527d"],
        

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
      relations : [ 
        "5285e4a887c630a36bbe8473", 
        "6585e4a887c630a36bbe8473"
      ]

    },
    {
      _id : "627bc927592c6d120dcc126b",
      username : "@farah",
      name : "Farah Ossama",
      email : "farahossama.123@gmail.com",
      password : "$2a$08$kBW2wS9uCc0g5NPVnAR7hupup6pUqYxvM7IJEb8KFRQKmV3Jmtyii",
      followers : [],
      following : [],
      profile_image_url:"http://www.twi-jay.me:8080/upload/image-1653425275467.jpg",
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
      relations : [ 
        "0285e4a887c630a36bbe8473", 
        "8285e4a887c630a36bbe8473" , 
        "6185e4a887c630a36bbe8473" ,
      ]

    },
    {
      _id : "627f964d055a48cb594004c5",
      username : "@farida",
      name : "Farida",
      email : "khadigaossama.123@gmail.com",
      password : "$2a$08$kBW2wS9uCc0g5NPVnAR7hupup6pUqYxvM7IJEb8KFRQKmV3Jmtyii",
      followers : [],
      following : [],
      profile_image_url:"http://www.twi-jay.me:8080/upload/image-1653425275343.jpg",
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
      relations : [ 
        "9285e4a887c630a36bbe8473" , 
        "6225e4a887c630a36bbe8473"
      ]

    },
    {
      _id : "62829a10d7a2423a544f527d",
      username : "@fathyJr20",
      name : "Fathy",
      email : "jwt03076@zcrcd.com",
      password : "$2a$08$kBW2wS9uCc0g5NPVnAR7hupup6pUqYxvM7IJEb8KFRQKmV3Jmtyii",
      followers : [],
      following : [],
      profile_image_url:"http://www.twi-jay.me:8080/upload/image-1653425275321.jpg",
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
      relations : [ 
        "1285e4a887c630a36bbe8473" , 
        "6785e4a887c630a36bbe8473"
      ]

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
