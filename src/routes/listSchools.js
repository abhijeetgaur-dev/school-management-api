const express = require("express");
const db = require("../config/database");

const listSchoolsRouter = express.Router();

listSchoolsRouter.get("/listschools", (req, res) => {
  let { latitude, longitude } = req.query;


  if (!latitude || !longitude) {
    return res.status(400).json({ message: 'Latitude and longitude are required' });
  }

  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ message: 'Latitude and longitude must be valid numbers' });
  }
  latitude = parseFloat(latitude);
  longitude = parseFloat(longitude);

  const sqlQuery = `
    SELECT 
      id, 
      name, 
      address, 
      latitude, 
      longitude,
      (6371 * acos(
        cos(radians(?)) * 
        cos(radians(latitude)) * 
        cos(radians(longitude) - radians(?)) + 
        sin(radians(?)) * 
        sin(radians(latitude))
      )) AS distance
    FROM schools
    ORDER BY distance;
  `;

  db.query(sqlQuery, [latitude, longitude, latitude], (err, results) => {
    if (err) {
      console.error('Error fetching schools:', err);
      return res.status(500).json({ message: 'Something went wrong', error: err.message });
    }

    res.status(200).json(results);
  });
});

module.exports = listSchoolsRouter;