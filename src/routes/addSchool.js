const express = require("express");
const db = require("../config/database");

const addSchoolRouter = express.Router();

addSchoolRouter.post("/add", (req, res) => {
  const { name, address, latitude, longitude } = req.body;


  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sqlQuery = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";

  db.query(sqlQuery, [name, address, parseFloat(latitude), parseFloat(longitude)], (err, result) => {
    if (err) {
      console.error("Error adding school:", err);
      return res.status(500).json({ message: 'Something went wrong', error: err.message });
    }

    res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });
  });
});

module.exports = addSchoolRouter;