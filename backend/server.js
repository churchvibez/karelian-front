const mysql = require('mysql2');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
app.use(cors());

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });

app.get('/articles', (req, res) => {
    connection.query(
      'SELECT a_title FROM article WHERE a_id BETWEEN 100 AND 110',
      (error, results) => {
        if (error) {
          console.error('Error executing query:', error);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
        res.json(results);
      }
    );
  });

app.listen(1337, () => {
    console.log('Server is running on port 1337');
  });


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

module.exports = connection;
