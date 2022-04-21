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
const endpointsFiles = ["./app/routes/OAuth.routes.js", "./app/routes/auth.routes.js","./app/routes/settings.routes.js","./app/routes/admin.routes.js","./app/routes/tweets.routes.js","./app/routes/adminBlock.routes.js"];


swaggerAutogen(outputFile, endpointsFiles, doc);
