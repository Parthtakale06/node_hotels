const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = process.env.MONGO_URL;

mongoose
  .connect(mongoURL)
  .then(() => console.log("Connected to MongoDB server"))
  .catch((err) => console.error("Error connecting to MongoDB server:", err));

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to MongoDB server");
});

db.on("disconnected", () => {
  console.log("Disconnected from MongoDB server");
});

db.on("error", (err) => {
  console.error("Error connecting to MongoDB server:", err);
});

module.exports = db;
