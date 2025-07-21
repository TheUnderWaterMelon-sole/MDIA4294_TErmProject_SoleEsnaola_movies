// movies.js
const express = require("express");
const db = require("../db");

const router = express.Router();

// GET all movies with info + image
router.get("/", (req, res) => {
  const sql = `
    SELECT mt.id, mt.title, mt.image, mi.director, mi.genre
    FROM movie_title mt
    JOIN movie_info mi ON mt.id = mi.movie_id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;