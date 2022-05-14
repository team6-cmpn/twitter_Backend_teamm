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
    app.get("/search/top",[authJwt.verifyToken], controller.searchTop);
    app.get("/search/people",[authJwt.verifyToken], controller.searchPeople);
    app.get("/search/latest",[authJwt.verifyToken], controller.seachLatest);
    app.get("/search/photos",[authJwt.verifyToken], controller.searchPhotos);
    app.put("/search/saveUser/:id",[authJwt.verifyToken], controller.saveSearchedUser);
    app.delete("/search/deleteSaved/:id",[authJwt.verifyToken],controller.deleteSearch);
    app.get("/search/getsaved",[authJwt.verifyToken], controller.getSavedSearch);
    app.delete("/search/deleteAllSaved",[authJwt.verifyToken], controller.deleteAllSearch);
  
};