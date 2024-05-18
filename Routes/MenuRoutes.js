const express = require("express");
const router = express.Router();
const Menu = require("./..//models/Menu");
//get method for the menu option

router.get("/", async (req, res) => {
  try {
    const data = await Menu.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log("erorr in data fetching");
    res.status(500).json({ error: "internal server error" });
  }
});

//post method to add a menu
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    //create a menu document using mongoose
    const newMenu = new Menu(data);
    const response = await newMenu.save();

    console.log("data saved succefully");
    res.status(200).json(response);
  } catch (error) {
    console.log("error while saving the data");
    res.status(500).json({ error: "internal error while saving data" });
  }
});

module.exports = router;
