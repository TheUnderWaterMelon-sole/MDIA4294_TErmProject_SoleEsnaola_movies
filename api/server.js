// server.js

const express = require('express');
const cors = require('cors');
const app = express();
const moviesRouter = require('./routes/movies');

app.use(cors());
app.use(express.json());

app.use('/api/movies', moviesRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});