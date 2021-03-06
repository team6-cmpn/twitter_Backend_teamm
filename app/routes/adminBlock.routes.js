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

app.post("/adminBlock/create",[authJwt.verifyToken,authJwt.checkIsAdmin,authJwt.checkAdminBlockCreate],controller.createBlock);
app.post("/adminBlock/destroy",[authJwt.verifyToken,authJwt.checkIsAdmin],controller.destroyBlock);
  };
