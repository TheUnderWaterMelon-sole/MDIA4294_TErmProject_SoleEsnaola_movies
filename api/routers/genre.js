// api/routers/genre.js
const express = require("express");
const genreRouter = express.Router();
const db = require("../db");

// GET all genres
genreRouter.get("/", (req, res) => {
    const sql = "SELECT * FROM genres";
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(results);
    });
});

// POST a new genre
genreRouter.post("/", (req, res) => {
    const { name } = req.body;

    const addGenreSQL = "INSERT INTO genres (name) VALUES (?)";
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