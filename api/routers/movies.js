// api/routes/movies.js - CRUD routes for movies (with description support)

const express = require("express");
const db = require("../db");
const router = express.Router();

// GET all movies (with director, genre, description via JOIN)
router.get("/", (req, res) => {
  const sql = `
    SELECT mt.id, mt.title, mt.image, mi.director, mi.genre, mi.description
    FROM movie_title mt
    JOIN movie_info mi ON mt.id = mi.movie_id
    ORDER BY mt.id DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET single movie by id (with description)
router.get("/:id", (req, res) => {
  const sql = `
    SELECT mt.id, mt.title, mt.image, mi.director, mi.genre, mi.description
    FROM movie_title mt
    JOIN movie_info mi ON mt.id = mi.movie_id
    WHERE mt.id = ?
  `;
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(results[0]);
  });
});

// CREATE a new movie (movie_title + movie_info)
// Expects: { title, image, director, genre, description }
router.post("/", (req, res) => {
  const { title, image, director, genre, description } = req.body;
  db.beginTransaction(err => {
    if (err) return res.status(500).json({ error: err.message });
    db.query(
      "INSERT INTO movie_title (title, image) VALUES (?, ?)",
      [title, image],
      (err, result) => {
        if (err) return db.rollback(() => res.status(500).json({ error: err.message }));
        const movieId = result.insertId;
        db.query(
          "INSERT INTO movie_info (movie_id, director, genre, description) VALUES (?, ?, ?, ?)",
          [movieId, director, genre, description],
          (err2) => {
            if (err2) return db.rollback(() => res.status(500).json({ error: err2.message }));
            db.commit(err3 => {
              if (err3) return db.rollback(() => res.status(500).json({ error: err3.message }));
              res.status(201).json({ id: movieId, title, image, director, genre, description });
            });
          }
        );
      }
    );
  });
});

// UPDATE a movie (both tables)
// Expects: { title, image, director, genre, description }
router.put("/:id", (req, res) => {
  const { title, image, director, genre, description } = req.body;
  db.beginTransaction(err => {
    if (err) return res.status(500).json({ error: err.message });
    db.query(
      "UPDATE movie_title SET title = ?, image = ? WHERE id = ?",
      [title, image, req.params.id],
      (err) => {
        if (err) return db.rollback(() => res.status(500).json({ error: err.message }));
        db.query(
          "UPDATE movie_info SET director = ?, genre = ?, description = ? WHERE movie_id = ?",
          [director, genre, description, req.params.id],
          (err2) => {
            if (err2) return db.rollback(() => res.status(500).json({ error: err2.message }));
            db.commit(err3 => {
              if (err3) return db.rollback(() => res.status(500).json({ error: err3.message }));
              res.json({ id: req.params.id, title, image, director, genre, description });
            });
          }
        );
      }
    );
  });
});

// DELETE a movie (both tables)
router.delete("/:id", (req, res) => {
  db.beginTransaction(err => {
    if (err) return res.status(500).json({ error: err.message });
    db.query(
      "DELETE FROM movie_info WHERE movie_id = ?",
      [req.params.id],
      (err) => {
        if (err) return db.rollback(() => res.status(500).json({ error: err.message }));
        db.query(
          "DELETE FROM movie_title WHERE id = ?",
          [req.params.id],
          (err2) => {
            if (err2) return db.rollback(() => res.status(500).json({ error: err2.message }));
            db.commit(err3 => {
              if (err3) return db.rollback(() => res.status(500).json({ error: err3.message }));
              res.json({ success: true });
            });
          }
        );
      }
    );
  });
});

module.exports = router;