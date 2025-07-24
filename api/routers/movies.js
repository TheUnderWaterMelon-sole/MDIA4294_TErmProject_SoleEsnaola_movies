/**
 * Movies Router - Express.js router handling all movie-related API endpoints
 *
 * Endpoints:
 * - GET /api/movies - Retrieve all movies with director and genre info
 * - GET /api/movies/:id - Get specific movie by ID
 * - POST /api/movies - Create new movie with image upload
 * - PUT /api/movies/:id - Update existing movie
 * - DELETE /api/movies/:id - Delete movie and associated data
 *
 * Database Schema:
 * - movie_title table: id, title, image
 * - movie_info table: movie_id (FK), director, genre, description
 */

const express = require('express');
const moviesRouter = express.Router();
const db = require('../db');
const upload = require('../storage');

// GET /api/movies - Retrieve all movies with joined movie info
moviesRouter.get('/', (req, res) => {
  const sql = `
        SELECT 
            mt.id, 
            mt.title as name, 
            mt.image as image_name,
            mi.director,
            mi.genre,
            mi.description
        FROM movie_title mt
        JOIN movie_info mi ON mt.id = mi.movie_id
    `;

  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    res.json(results);
  });
});

// GET /api/movies/:id - Get a single movie from the database
moviesRouter.get('/:id', (req, res) => {
  // Get the id from the URL
  const { id } = req.params;

  const sql = `
        SELECT 
            mt.id, 
            mt.title as name, 
            mt.image as image_name,
            mi.director,
            mi.genre,
            mi.description
        FROM movie_title mt
        JOIN movie_info mi ON mt.id = mi.movie_id
        WHERE mt.id = ?`;

  // Substitute the '?' with the id from the URL to prevent SQL injection
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    }
    res.json(results[0]);
  });
});

// POST /api/movies - Create new movie with file upload support
moviesRouter.post('/', upload.single('image'), (req, res) => {
  // Extract movie data from request body
  const { director_id, genre_id, title, description } = req.body;

  // Handle uploaded image file
  const image = req.file ? req.file.filename : null;

  // Determine if director/genre are new (text) or existing (numeric ID)
  const isDirectorNew = isNaN(director_id);
  const isGenreNew = isNaN(genre_id);

  if (isDirectorNew && isGenreNew) {
    // Both are new - use them directly
    insertMovie(title, image, director_id, genre_id, description, res);
  } else if (isDirectorNew && !isGenreNew) {
    // Director is new, genre is existing - get genre name
    getGenreName(genre_id, (genreName) => {
      insertMovie(title, image, director_id, genreName, description, res);
    });
  } else if (!isDirectorNew && isGenreNew) {
    // Director is existing, genre is new - get director name
    getDirectorName(director_id, (directorName) => {
      insertMovie(title, image, directorName, genre_id, description, res);
    });
  } else {
    // Both are existing - get both names
    getDirectorName(director_id, (directorName) => {
      getGenreName(genre_id, (genreName) => {
        insertMovie(title, image, directorName, genreName, description, res);
      });
    });
  }
});

// Helper function to get director name by ID
function getDirectorName(director_id, callback) {
  const directorsQuery =
    'SELECT DISTINCT director as name FROM movie_info ORDER BY director';
  db.query(directorsQuery, (err, directors) => {
    if (err) {
      console.error(err);
      return;
    }
    const directorName = directors[director_id - 1]?.name || directors[0]?.name;
    callback(directorName);
  });
}

// Helper function to get genre name by ID
function getGenreName(genre_id, callback) {
  const genresQuery =
    'SELECT DISTINCT genre as name FROM movie_info ORDER BY genre';
  db.query(genresQuery, (err, genres) => {
    if (err) {
      console.error(err);
      return;
    }
    const genreName = genres[genre_id - 1]?.name || genres[0]?.name;
    callback(genreName);
  });
}

// Helper function to insert movie into database
function insertMovie(title, image, directorName, genreName, description, res) {
  // Insert into movie_title table first
  const addMovieTitleSQL = `INSERT INTO movie_title (title, image) VALUES (?, ?)`;

  db.query(addMovieTitleSQL, [title, image], (err, titleResults) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error adding movie title' });
    }

    const movieId = titleResults.insertId;

    // Insert into movie_info table
    const addMovieInfoSQL = `INSERT INTO movie_info (movie_id, director, genre, description) VALUES (?, ?, ?, ?)`;

    db.query(
      addMovieInfoSQL,
      [movieId, directorName, genreName, description],
      (err, infoResults) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ error: 'Server error adding movie info' });
        }

        res
          .status(200)
          .json({ message: 'Movie added successfully', movieId: movieId });
      }
    );
  });
}

// Update a movie entry in the database
moviesRouter.put('/:id', upload.single('image'), (req, res) => {
  // Get the id from the URL
  const { id } = req.params;

  // Get the title, description, director ID and genre ID from the request body
  const { title, description, director_id, genre_id } = req.body;

  let updateMovieSQL = `UPDATE movies SET name = ?, description = ?, director_id = ?, genre_id = ?`;

  const queryParams = [title, description, director_id, genre_id];

  if (req.file) {
    updateMovieSQL += `, image_name = ?`;
    queryParams.push(req.file.filename);
  }
  updateMovieSQL += ` WHERE id = ? LIMIT 1`;
  queryParams.push(id);

  db.query(updateMovieSQL, queryParams, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error updating movie' });
    }

    res.json({ message: 'Movie updated successfully' });
  });
});

moviesRouter.delete('/:id', (req, res) => {
  const { id } = req.params;

  const sql = ` DELETE FROM movies WHERE id = ? LIMIT 1`;

  // Like above, substitute the '?' with the id from the URL
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    }

    res.json({ message: 'Movie deleted successfully' });
  });
});

module.exports = moviesRouter;
