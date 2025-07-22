const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const moviesRouter = require("./routers/movies");
const genreRouter = require("./routers/genre");
const directorRouter = require("./routers/director"); // Moved up here

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.use("/api/movies", moviesRouter);
app.use("/api/genres", genreRouter);
app.use("/api/directors", directorRouter); // Now works!

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));