const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

const { TokenExpiredError } = jwt;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      if (err instanceof TokenExpiredError) {
        return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
      }
      console.log(err);
      return res.sendStatus(401).send({ message: "Unauthorized! token"});
    }
  
    // if (decoded.isDeactivated){
    //   return res.sendStatus(401).send({ message: "This account is deactivated!" });
    // }
    
    req.userId = decoded.id;
    next();
  });
};


const authJwt = {
  verifyToken
};
module.exports = authJwt;