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


swaggerAutogen(outputFile, endpointsFiles, doc);
