const express = require("express");
const router = express.Router();
const Person = require("./..//models/Person");

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log("error found whilw fetching data", error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const data = await Person.find({ work: workType });
      console.log("data fetched");
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: "invalid worktype" });
    }
  } catch (error) {}
});

// Route to handle POST requests to add a person
router.post("/", async (req, res) => {
  try {
    const data = req.body; // Request body contains the person data

    // Create a person document using the mongoose model
    const newPerson = new Person(data);
    const response = await newPerson.save();

    console.log("Data saved:", response);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error occurred while saving data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const person_id = req.params.id; // extract id from the url parameter
    const updated_data = req.body;

    const response = await Person.findByIdAndUpdate(person_id, updated_data, {
      new: true,
      runValidator: true,
    });

    if (!response) {
      // If response is null, it means no person was found with that ID
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("data updated");
    res.status(200).json({ response });
  } catch (error) {
    console.error("Error occurred while updating data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
