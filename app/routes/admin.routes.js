const controller = require("../controllers/admin.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.get("/admin/showUsers",authJwt.verifyToken,controller.showUsers);
  app.get("/admin/dashBoard",authJwt.verifyToken,controller.getStatistics);
};
