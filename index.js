const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user"); //new addition
const category = require("./routes/category"); //new addition
const items = require("./routes/items"); //new addition
const InitiateMongoServer = require("./config/db");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const apiErrorHandler = require("./error/api-error-handler");

// Initiate Mongo Server
InitiateMongoServer();

const app = express();
const HOSTNAME = "https://api.winbings.com";

app.use(cors());
app.use(express.static("images"));
// PORT
const PORT = 4000;

module.exports = {
  endpoint: HOSTNAME,
  port: PORT,
};

// Middleware
app.use(bodyParser.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Billing POS API",
      version: "1.0.0",
    },
    servers: ["http://localhost:5000"],
  },
  apis: ["./routes/*.js"], // files containing annotations as above
};

const openApiSpecification = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiSpecification));

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use("/user", user);
app.use("/category", category);
app.use("/products", items);
app.use(apiErrorHandler);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
