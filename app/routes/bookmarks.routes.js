const controller = require("../controllers/bookmarks.controller");
const { authJwt , verifySignUp} = require("../middleware");

module.exports = function(app) {
    
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
    app.put("/bookmarks/add/:id",[authJwt.verifyToken], controller.addBookmark);
    app.delete("/bookmarks/remove/:id",[authJwt.verifyToken], controller.removeBookmark);
    app.get("/bookmarks/get",[authJwt.verifyToken], controller.getBookmarks);
    app.delete("/bookmarks/removeAll",[authJwt.verifyToken], controller.deleteAllBookmarks);
  
};