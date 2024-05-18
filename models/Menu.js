const mongoose = require("mongoose");

let menuSchema = new mongoose.Schema({
  item_name: {
    type: String,
    required: true,
  },
  taste: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  isVeg: {
    type: Boolean,
  },
});

// create menu model

const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;
