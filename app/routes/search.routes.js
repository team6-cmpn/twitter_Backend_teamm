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
    app.get("/search/top", controller.searchTop);
    app.get("/search/people", controller.searchPeople);
    app.get("/search/latest", controller.seachLatest);
    //app.get("/search/latest", controller.searchLatest);
//   app.post("/settings/changePassword",[authJwt.verifyToken, verifySignUp.checkStrenghtOfPassword],controller.changePassword);
//   app.post("/settings/forgetPassword",controller.sendForgetPasswordEmail);
//   app.get("/settings/forgetPassword/:emailtoken" ,controller.receiveForgetPasswordEmail);
//   app.post("/settings/resetForgetPassword",[authJwt.verifyToken,verifySignUp.checkStrenghtOfPassword],controller.resetForgetPassword);
  
};