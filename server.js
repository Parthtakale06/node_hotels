const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

const Menu = require("./models/Menu");
const PersonRoute = require("./Routes/PersonRoute");
const MenuRoutes = require("./Routes/MenuRoutes");
require("dotenv").config();
const passport = require("./auth");

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware function
const logrequest = (req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} Request made to: ${req.originalUrl}`
  );
  next();
};

app.use(passport.initialize());

// Log requests middleware
app.use(logrequest);

const localAuthMiddleware = passport.authenticate("local", { session: false });

app.get("/", (req, res) => {
  res.send("hello sir, welcome to my hotel!");
});

app.use("/person", localAuthMiddleware, PersonRoute);
app.use("/menu", MenuRoutes);

// Start the server
app.listen(port, () => {
  console.log("Server listening on port", port);
});
