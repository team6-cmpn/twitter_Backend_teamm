const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const { verify } = require("jsonwebtoken");

module.exports = function(app) {
    
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/auth/signup", [verifySignUp.checkExistingUsernameOrEmail,verifySignUp.checkValidEmail, verifySignUp.checkStrenghtOfPassword, verifySignUp.checkValidPhoneNumber], controller.signup);
  app.post("/auth/signin", controller.signin);
  app.post("/auth/resendEmail" ,controller.resendEmail);
  app.post("/auth/resendSMS" ,controller.resendSMS);
  app.post("/auth/confirmation" ,controller.confirmEmail);
  //app.get("/auth/confirmation/:emailtoken" ,controller.confirmEmail);
  //app.post("/auth/signup-google", controller.singupGoogle) 
};