// db.js
// MySQL DB Connection
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "sole_movies",
  password: "secretPassword1",
  database: "movies",
  port: 8889,
});

db.connect((err) => {
  if (err) {
    console.log("ERROR connecting to movies database ⛔ ", err);
    return;
  }
  console.log("Connected to movies database 🎬");
});

module.exports = db;