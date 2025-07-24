// server.js

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 3000;

// You must require your routers before using them!
const directorRouter = require("./routers/director");
const moviesRouter = require("./routers/movies");
const genreRouter = require("./routers/genre");

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());

app.use("/api/directors", directorRouter);
app.use("/api/movies", moviesRouter);
app.use("/api/genres", genreRouter);

app.listen(PORT, () => {
	console.log(`Access this app at http://localhost:${PORT}/ `);
});