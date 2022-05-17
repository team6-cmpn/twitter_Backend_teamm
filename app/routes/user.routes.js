const { authJwt,verifySignUp } = require("../middleware");
const controller = require("../controllers/user.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //app.use(authJwt.verifyToken);
  app.get("/user/show/:id" , controller.userShow); // tested
  app.get("/user/lookup/:ids" , controller.usersLookup); // tested
  app.get("/user/followingIDs/:id" , controller.userFollowingIDs);
  app.get("/user/followingList/:id" , controller.userFollowingList);
  app.get("/user/followersList/:id" , controller.userFollowersList);
  app.get("/user/followersIDs/:id" , controller.userFollowersIDs);
  app.get("/user/blockedIDs/:id" , controller.userBlocksIDs);
  app.get("/user/blockedList/:id" , controller.userBlocksList);
  app.get("/user/mutedIDs/:id" , controller.userMutedIDs);
  app.get("/user/mutedList/:id" , controller.userMutedList); 
  //app.get("/friendships/lookup",[authJwt.verifyToken],controller.friendshipsLookup) // not used
  //app.get("/friendships/no_retweets/ids",[authJwt.verifyToken],controller.friendshipsLookup) // not used
  //app.get("/friendships/show/:source_id/:target_id",controller.friendshipsShow); not used
  app.post("/friendships/create/:id",[authJwt.verifyToken],controller.friendshipsCreate) // tested
  app.post("/friendships/block/:id",[authJwt.verifyToken],controller.userBlocking)
  app.post("/friendships/unblock/:id",[authJwt.verifyToken],controller.userUnBlocking)
  app.post("/friendships/destroy/:id",[authJwt.verifyToken],controller.friendshipsDestroy)
  app.post("/friendships/mute/:id",[authJwt.verifyToken],controller.friendshipsMute)
  app.post("/friendships/unmute/:id",[authJwt.verifyToken],controller.friendshipsUnMute)
  app.post("/user/update",[authJwt.verifyToken],controller.userUpdateProfile)
  app.get("/user/tweetsList",[authJwt.verifyToken],controller.userTweetsList);
  app.get("/user/likedTweetsList",[authJwt.verifyToken],controller.userLikedTweetsList);
  app.get("/user/mediaList",[authJwt.verifyToken],controller.userMediaList);
  app.post("/user/changeusername",[authJwt.verifyToken,verifySignUp.checkValidUsername],controller.userChangeUsername);
  app.post("/user/changeemail",[authJwt.verifyToken,verifySignUp.checkValidEmail],controller.userChangeEmail);
  app.post("/user/changePhoneNumber",[authJwt.verifyToken,verifySignUp.checkValidPhoneNumber],controller.userChangePhoneNumber);
}