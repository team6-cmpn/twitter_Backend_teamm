const { authJwt } = require("../middleware");
const controller = require("../controllers/image.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //app.use(authJwt.verifyToken);
    //app.post("/image/upload", upload.single("image"), controller.uploadPhoto);
  app.post("/image/profile/upload" , controller.uploadProfilePhoto);
  app.post("/image/tweet/upload" , controller.uploadTweetPhotos);
}