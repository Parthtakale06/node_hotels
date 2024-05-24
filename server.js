const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

const Menu = require("./models/Menu");
const PersonRoute = require("./Routes/PersonRoute");
const MenuRoutes = require("./Routes/MenuRoutes");
require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("./models/Person");

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

// Implementing the local strategy
passport.use(
  new LocalStrategy(async function checkUserLogin(username, password, done) {
    try {
      console.log("user-credentials", username, password);
      const user = await Person.findOne({ username });
      if (!user) {
        return done(null, false, { message: "incorrect username" });
      }

      const isPasswordMatch = user.password === password; // Compare passwords directly
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "incorrect password" });
      }
    } catch (error) {
      done(error);
    }
  })
);

app.use(passport.initialize());

// Log requests middleware
app.use(logrequest);

// Define login route
app.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    return res.json({
      message: "Login successful",
      user: { id: user.id, username: user.username },
    });
  })(req, res, next);
});

// Example route
app.get("/", passport.authenticate("local", { session: false }), (req, res) => {
  res.send("hello sir, welcome to my hotel!");
});

app.use("/person", PersonRoute);
app.use("/Menu", MenuRoutes);

// Start the server
app.listen(port, () => {
  console.log("Server listening on port", port);
});
