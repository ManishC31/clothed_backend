const express = require("express");
const app = express();
const routes = require("./navigations");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// routes
app.use("/api/v1", routes);

module.exports = app;
