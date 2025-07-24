//  api/routers/genre.js
const express = require("express");
const genreRouter = express.Router();
const db = require("../db");
     
genreRouter.get("/", (req, res) => {
    const sql = "SELECT DISTINCT genre as name FROM movie_info ORDER BY genre";
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        // Add IDs manually since we can't use ROW_NUMBER in this MySQL version
        const genresWithIds = results.map((genre, index) => ({
            id: index + 1,
            name: genre.name
        }));
        res.json(genresWithIds);
    });
});

// Handle POST requests to add a new genre
genreRouter.post('/', (req, res) => {

    // Get the new genre name from the request body
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Genre name is required" });
    }

    // Check if genre already exists
    const checkGenreSQL = `SELECT DISTINCT genre FROM movie_info WHERE genre = ? LIMIT 1`;
    
    db.query(checkGenreSQL, [name], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        
        if (results.length > 0) {
            return res.status(400).json({ error: "Genre already exists" });
        }
        
        // Since we don't have a separate genres table, we'll just return success
        // The genre will be added when a movie is created with this genre
        res.status(201).json({
            genreId: Date.now(), // Simple ID generation for demo
            name: name,
            message: "Genre will be available when you create a movie with this genre",
        });
    });
});

module.exports = genreRouter;