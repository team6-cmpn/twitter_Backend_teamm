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
      password : "$aa2azfbg$08$kefayeAs1aIEkXae5FOueVrLc5.jtDh36Ogk2M0H3SR3JmXXe1C",
      followers_count : 150,
      following : [],
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
        password : "$aa2azfbg$08$kefmeeNs1bIEkXae5FOueVrLc5.jtDh36Ogk2N0H3SR3JmXXe1C",
        followers_count : 150,
        following : [],
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
        password : "$aa2sqfbg$08$kefmeeNs1bIEkXae5FOueVrLc5.jtDh36Ogk2N0H3SR3JmXXe1C",
        followers_count : 150,
        following : [],
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
        password : "$ae7sqfbg$08$kefmeeNs1bSEkXae5FOueVrLc5.jtDh36Ogk2N0H3SR3JmXXe1C",
        followers_count : 150,

        following : [],
        admin_block : {
            blocked_by_admin : true,
            block_duration : 1000,
            blockNumTimes : 0,
              block_createdAt: faker.date.recent() ,
        },
        isAdmin : false,
        confirmed : true,
    }
]


class UsersSeeder extends Seeder {
  async shouldRun() {
    return User.countDocuments()
      .exec()
      //.then(count => count === 0);
  }

  async run() {
    return User.create(data);
  }
}

module.exports = UsersSeeder;
