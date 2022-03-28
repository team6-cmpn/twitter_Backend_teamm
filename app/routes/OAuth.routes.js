const { verifySignUp } = require("../middleware");
const controller = require("../controllers/OAuth.controller");

module.exports = function(app) {
    
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/OAuth/google/signup", verifySignUp.checkExistingGoogleId, controller.signupGoogle);
  app.post("/OAuth/google/signin", controller.signinGoogle);
  //app.get("/OAuth/google/signin", controller.signinGoogle);

};