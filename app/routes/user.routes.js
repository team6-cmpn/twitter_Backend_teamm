const { authJwt } = require("../middleware");
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
  app.get("/user/show" , controller.userShow);
  app.get("/user/lookup/:username" , controller.usersLookup);
  app.get("/user/followingIDs/:id" , controller.userFollowingIDs);
  app.get("/user/followingList/:id" , controller.userFollowingList);
  app.get("/user/followersList/:id" , controller.userFollowersList);
  app.get("/user/followersIDs/:id" , controller.userFollowersIDs);
  app.get("/friendships/lookup",[authJwt.verifyToken],controller.friendshipsLookup)
  app.get("/friendships/no_retweets/ids",[authJwt.verifyToken],controller.friendshipsLookup)
  app.get("/friendships/show/:source_id/:target_id",controller.friendshipsShow);
  app.get("/friendships/create/:id",[authJwt.verifyToken],controller.friendshipsCreate)
  app.get("/friendships/destroy/:id",[authJwt.verifyToken],controller.friendshipsDestroy)
  app.post("/user/update",[authJwt.verifyToken],controller.userUpdateProfile)
  app.get("/user/tweetsList",[authJwt.verifyToken],controller.userTweetsList);
  app.get("/user/likedTweetsList",[authJwt.verifyToken],controller.userLikedTweetsList);
}