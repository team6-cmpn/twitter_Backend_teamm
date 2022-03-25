const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const db = require("./app/models");
const dbConfig = require("./app/config/db.config");
// from auth.controller
// const User = db.user;
// var bcrypt = require("bcryptjs");


var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//conect the database
db.mongoose
.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Successfully connect to MongoDB.");
})
.catch(err => {
  console.error("Connection error", err);
  process.exit();
});
  
  
app.get("/", (req, res) => {
  res.json({ message: "Welcome to test Auth application." });
});

require('./app/routes/auth.routes')(app);
// just for testing
// app.post("/test", (req, res) => {
//   const user = new User({
//     id: req.body.id,
//     //name: req.body.name,
//     username: req.body.username,
//     email: req.body.email,
//     password: bcrypt.hashSync(req.body.password, 8)
//   });
//   // user.save();
//   // res.send(user);
//   user.save((err, user) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }
//     res.send({ message: "User was registered successfully!" });
//   });
// });

// server listening on port 8080 
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});