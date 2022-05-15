const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Twitter API documentation",
    description: "this is Twitter API documentation for team 6",
  },
  host: "twi-jay.xyz:8080",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app/routes/OAuth.routes.js", "./app/routes/auth.routes.js","./app/routes/settings.routes.js","./app/routes/admin.routes.js","./app/routes/tweets.routes.js","./app/routes/adminBlock.routes.js","./app/routes/search.routes.js","./app/routes/notifications.routes.js","./app/routes/bookmarks.routes.js","./app/routes/user.routes.js","./app/routes/image.routes.js"];


swaggerAutogen(outputFile, endpointsFiles, doc);
