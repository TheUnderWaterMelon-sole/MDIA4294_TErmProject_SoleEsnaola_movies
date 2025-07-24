//  api/routers/director.js
const express = require("express");
const directorRouter = express.Router();
const db = require("../db");
     
directorRouter.get("/", (req, res) => {
    const sql = "SELECT DISTINCT director as name FROM movie_info ORDER BY director";
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        // Add IDs manually since we can't use ROW_NUMBER in this MySQL version
        const directorsWithIds = results.map((director, index) => ({
            id: index + 1,
            name: director.name
        }));
        res.json(directorsWithIds);
    });
});

// Handle POST requests to add a new director
directorRouter.post('/', (req, res) => {

    // Get the new director name from the request body
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Director name is required" });
    }

    // Check if director already exists
    const checkDirectorSQL = `SELECT DISTINCT director FROM movie_info WHERE director = ? LIMIT 1`;
    
    db.query(checkDirectorSQL, [name], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        
        if (results.length > 0) {
            return res.status(400).json({ error: "Director already exists" });
        }
        
        // Since we don't have a separate directors table, we'll just return success
        // The director will be added when a movie is created with this director
        res.status(201).json({
            directorId: Date.now(), // Simple ID generation for demo
            name: name,
            message: "Director will be available when you create a movie with this director",
        });
    });
});

module.exports = directorRouter;