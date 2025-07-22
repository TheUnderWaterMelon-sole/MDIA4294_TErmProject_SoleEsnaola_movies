const express = require("express");
const directorRouter = express.Router();
const db = require("../db");

// GET all unique directors from movies table
directorRouter.get("/", (req, res) => {
    const sql = "SELECT DISTINCT director FROM movies";
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        // Map to {id, name} for compatibility with your frontend
        const directors = results
            .filter(row => row.director && row.director.trim() !== "")
            .map((row, idx) => ({
                id: idx + 1,
                name: row.director
            }));
        res.json(directors);
    });
});

// POST to add a new director (adds a dummy movie row)
directorRouter.post('/', (req, res) => {
    const { name } = req.body;
    const addDirectorSQL = `INSERT INTO movies (director, genre, description) VALUES (?, '', '')`;
    db.query(addDirectorSQL, [name], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        res.status(201).json({
            directorId: results.insertId,
            message: "Director added successfully",
        });
    });
});

module.exports = directorRouter;