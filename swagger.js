const swaggerJSDoc = require("swagger-jsdoc");
const swaggerDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Students API",
      version: "1.0.0",
      description: "API for managing my Students",
    },
    Servers: [
      {
        url: "redener",
        description: "servidor render online",
      },
      {
        url: "http://localhost:3000",
        description: "meu app servidor local",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerOptions = swaggerDoc(options);

module.exports = swaggerOptions;