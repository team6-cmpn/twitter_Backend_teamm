const controller = require("../controllers/search.controller");
const { authJwt , verifySignUp} = require("../middleware");

module.exports = function(app) {
    
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
    app.get("/search/user", controller.searchName);
//   app.post("/settings/changePassword",[authJwt.verifyToken, verifySignUp.checkStrenghtOfPassword],controller.changePassword);
//   app.post("/settings/forgetPassword",controller.sendForgetPasswordEmail);
//   app.get("/settings/forgetPassword/:emailtoken" ,controller.receiveForgetPasswordEmail);
//   app.post("/settings/resetForgetPassword",[authJwt.verifyToken,verifySignUp.checkStrenghtOfPassword],controller.resetForgetPassword);
  
};