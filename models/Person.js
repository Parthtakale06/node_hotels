const mongoose = require("mongoose");

let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["waiter", "manager", "chef"],
    required: true,
  },
  mobile_no: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    required: true,
    type: Number,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// create person model
const Person = mongoose.model("Person", personSchema);
module.exports = Person;
