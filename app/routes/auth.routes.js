const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
    
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/auth/signup", verifySignUp.checkExistingUsernameOrEmail, controller.signup);
  app.post("/auth/signin", controller.signin);
  app.get("/auth/confirmation/:emailtoken" ,controller.confirmEmail); 
  
};