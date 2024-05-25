const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

personSchema.pre("save", async function (next) {
  const person = this;
  if (!person.isModified("password")) {
    // Corrected the conditional check
    return next();
  }
  try {
    // Hash password generation
    const salt = await bcrypt.genSalt(10);

    // Hash password
    const hashedPassword = await bcrypt.hash(person.password, salt);

    // Override the main user password
    person.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// Define a method to compare passwords
personSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Create person model
const Person = mongoose.model("Person", personSchema);
module.exports = Person;
