const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const Person = require("./models/Person");
const Menu = require("./models/Menu");
const PersonRoute = require("./Routes/PersonRoute");
const MenuRoutes = require("./Routes/MenuRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to handle GET requests
app.get("/", (req, res) => {
  res.send("hello sir, welcome to my hotel!");
});

app.use("/person", PersonRoute);
app.use("/Menu", MenuRoutes);

// Start the server
app.listen(port, () => {
  console.log("Server listening on port", port);
});
