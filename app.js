require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const db = require("./app/models");
const dbConfig = require("./app/config/db.config");
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

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
require('./app/routes/user.routes')(app);
require('./app/routes/OAuth.routes')(app);
//require('./app/routes/OAuth.routesTest')(app);



// server listening on port 8080 
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});