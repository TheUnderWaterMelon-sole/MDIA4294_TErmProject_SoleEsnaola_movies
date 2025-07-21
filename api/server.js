// server.js

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = 3001;

// Use the new 'routers' folder for your routers
const moviesRouter = require("./routers/movies");
const storageRouter = require("./routers/storage");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Serve uploaded images as static files
app.use("/uploads", express.static("uploads"));

app.use("/api/movies", moviesRouter);
app.use("/api/storage", storageRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});