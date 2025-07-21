// api/index.js

const express = require("express");
const cors = require("cors");
const moviesRouter = require("./routes/movies");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/movies", moviesRouter);

const PORT = 3001;
app.listen(PORT, () => console.log(`API server running on http://localhost:${PORT}`));