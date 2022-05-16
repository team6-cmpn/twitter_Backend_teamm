const controller = require("../controllers/tweets.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


app.post("/tweets/update",[authJwt.verifyToken,authJwt.checkAdminBlockTweet],controller.update);
app.post("/tweets/destroy/:id",authJwt.verifyToken,controller.destroyTweet);
app.get("/tweets/show/:id",controller.show);
app.get("/tweets/lookup/:page/:tweetsCount",authJwt.verifyToken,controller.lookup);
app.post("/tweets/favorites/create/:id",authJwt.verifyToken,controller.favorite);
app.post("/tweets/favorites/destroy/:id",authJwt.verifyToken,controller.unfavorite);
app.post("/tweets/retweet/:id",[authJwt.verifyToken,authJwt.checkAdminBlockTweet],controller.retweet);
app.post("/tweets/unretweet/:id",authJwt.verifyToken,controller.unretweet);
app.get("/tweets/retweeters/:id",controller.retweeters);
app.get("/tweets/favoritelist/:id",controller.favoriteList);  
};
