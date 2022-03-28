const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Twitter API documentation",
    description: "this is Twitter API documentation for team 6",
  },
  host: "localhost:8080",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app/routes/OAuth.routes.js", "./app/routes/auth.routes.js"];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
// swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
//     require('./app.js')           // Your project's root file
// });