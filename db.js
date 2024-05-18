const mongoose = require("mongoose");

//define the mongo db connection url
const mongoURL = "mongodb://localhost:27017/hotels";

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("connected to mongoDB server");
});

db.on("disconnected", () => {
  console.log("disconnected to mongoDB server");
});

db.on("error", () => {
  console.log("error to mongoDB server");
});

module.exports = db;
