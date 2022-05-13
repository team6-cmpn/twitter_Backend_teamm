const controller = require("../controllers/notifications.controller");

const { authJwt } = require("../middleware");
module.exports = function(app) {

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/notifications",authJwt.verifyToken,controller.showNotifications);
  app.get("/notifications/favourites",authJwt.verifyToken,controller.showFavouritesNotifications);
};
