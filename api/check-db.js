// Check what tables exist in the database
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'sole_movies',
  password: 'secretPassword1',
  database: 'movies',
  port: 8889,
});

db.connect((err) => {
  if (err) {
    console.log('ERROR connecting to movies database ⛔ ', err);
    return;
  }
  console.log('Connected to movies database 🎬');

  // Show all tables
  db.query('SHOW TABLES', (err, results) => {
    if (err) {
      console.error('Error showing tables:', err);
      db.end();
      return;
    }

    console.log('Tables in database:');
    console.log(results);

    // Check if we have any data in case tables exist with different names
    if (results.length > 0) {
      results.forEach((table) => {
        const tableName = Object.values(table)[0];
        console.log(`\n--- Table: ${tableName} ---`);

        db.query(`SELECT * FROM ${tableName} LIMIT 3`, (err, data) => {
          if (err) {
            console.error(`Error querying ${tableName}:`, err);
          } else {
            console.log(`Sample data from ${tableName}:`, data);
          }
        });
      });
    }

    setTimeout(() => {
      db.end();
    }, 2000);
  });
});
