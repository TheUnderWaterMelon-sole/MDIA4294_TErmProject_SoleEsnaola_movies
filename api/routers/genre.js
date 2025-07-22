const express = require("express");
const genreRouter = express.Router();
const db = require("../db");

// GET all unique genres from movies table (split by "/" & trim)
genreRouter.get("/", (req, res) => {
    const sql = "SELECT DISTINCT genre FROM movies";
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        const genreSet = new Set();
        results.forEach(row => {
            if (row.genre && row.genre.trim() !== "") {
                row.genre.split("/").forEach(g => {
                    const trimmed = g.trim();
                    if (trimmed) genreSet.add(trimmed);
                });
            }
        });
        const genres = Array.from(genreSet).map((g, idx) => ({
            id: idx + 1,
            name: g
        }));
        res.json(genres);
    });
});

// POST to add a new genre (adds a dummy movie row)
genreRouter.post('/', (req, res) => {
    const { name } = req.body;
    const addGenreSQL = `INSERT INTO movies (director, genre, description) VALUES ('', ?, '')`;
    db.query(addGenreSQL, [name], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        res.status(201).json({
            genreId: results.insertId,
            message: "Genre added successfully",
        });
    });
});

module.exports = genreRouter;