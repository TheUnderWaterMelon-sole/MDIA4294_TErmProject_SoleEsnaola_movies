// movies.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all movies with info
router.get('/', (req, res) => {
  const sql = `
    SELECT mt.id, mt.title, mt.image, mi.director, mi.genre
    FROM movie_title mt
    LEFT JOIN movie_info mi ON mt.id = mi.movie_id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({error: err});
    res.json(results);
  });
});

// Get single movie by ID
router.get('/:id', (req, res) => {
  const sql = `
    SELECT mt.id, mt.title, mt.image, mi.director, mi.genre
    FROM movie_title mt
    LEFT JOIN movie_info mi ON mt.id = mi.movie_id
    WHERE mt.id = ?
  `;
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({error: err});
    res.json(results[0]);
  });
});

// Filter movies
router.get('/filter/:type/:value', (req, res) => {
  let sql;
  if (req.params.type === 'genre') {
    sql = `
      SELECT mt.id, mt.title, mt.image, mi.director, mi.genre
      FROM movie_title mt
      LEFT JOIN movie_info mi ON mt.id = mi.movie_id
      WHERE mi.genre LIKE ?
    `;
  } else if (req.params.type === 'director') {
    sql = `
      SELECT mt.id, mt.title, mt.image, mi.director, mi.genre
      FROM movie_title mt
      LEFT JOIN movie_info mi ON mt.id = mi.movie_id
      WHERE mi.director LIKE ?
    `;
  } else {
    return res.status(400).json({error: 'Invalid filter type'});
  }
  db.query(sql, [`%${req.params.value}%`], (err, results) => {
    if (err) return res.status(500).json({error: err});
    res.json(results);
  });
});

// Add a new movie
router.post('/', (req, res) => {
  const { title, image, director, genre } = req.body;
  const sqlTitle = 'INSERT INTO movie_title (title, image) VALUES (?, ?)';
  db.query(sqlTitle, [title, image], (err, result) => {
    if (err) return res.status(500).json({error: err});
    const movieId = result.insertId;
    const sqlInfo = 'INSERT INTO movie_info (movie_id, director, genre) VALUES (?, ?, ?)';
    db.query(sqlInfo, [movieId, director, genre], (err2) => {
      if (err2) return res.status(500).json({error: err2});
      res.json({id: movieId});
    });
  });
});

// Delete a movie
router.delete('/:id', (req, res) => {
  const sql = 'DELETE FROM movie_title WHERE id = ?';
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json({error: err});
    res.json({success: true});
  });
});

// Edit a movie
router.put('/:id', (req, res) => {
  const { title, image, director, genre } = req.body;
  const sqlTitle = 'UPDATE movie_title SET title = ?, image = ? WHERE id = ?';
  db.query(sqlTitle, [title, image, req.params.id], (err) => {
    if (err) return res.status(500).json({error: err});
    const sqlInfo = 'UPDATE movie_info SET director = ?, genre = ? WHERE movie_id = ?';
    db.query(sqlInfo, [director, genre, req.params.id], (err2) => {
      if (err2) return res.status(500).json({error: err2});
      res.json({success: true});
    });
  });
});

module.exports = router;