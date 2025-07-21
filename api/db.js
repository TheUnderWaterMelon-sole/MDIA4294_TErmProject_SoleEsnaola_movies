// db.js
// MySQL DB Connection
const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // use your MAMP username
  password: 'root', // use your MAMP password
  database: 'movies' // your MAMP database name
  port: 8889, // MAMP MySQL port
});
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});
module.exports = db;