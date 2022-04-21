require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const db = require("./app/models");
// console.log(db.user);
// console.log(db.tweet);
//console.log(db.role);
//const dbConfig = require("./app/config/db.config");
//for the API documentation
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

if (process.env.DB_NAME == "Twitter_db"){
//console.log(process.env.DB_NAME)
  //conect the database
  db.mongoose
  .connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    //useCreateIndex: true,
    //useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
}
  
  
app.get("/", (req, res) => {
  res.json({ message: "Welcome to test Auth application." });
});

//PLEASE INCLUDE YOUR ROUTES
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/OAuth.routes')(app);
require('./app/routes/settings.routes')(app);
require('./app/routes/search.routes')(app);
require('./app/routes/admin.routes')(app);
require('./app/routes/adminBlock.routes')(app);
require('./app/routes/tweets.routes')(app);

//require('./app/routes/OAuth.routesTest')(app);

//export the app
module.exports = app;

// // server listening on port 8080 
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });
