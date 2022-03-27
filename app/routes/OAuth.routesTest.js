//const { verifySignUp } = require("../middleware");
const controller = require("../controllers/OAuth.controllerTest");

module.exports = function(app) {
    
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/OAuth/signup",controller.openSignupGoogle);
  //app.get("/OAuth/google/signup", controller.singupGoogle);
};