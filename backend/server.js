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

// home

app.get('/home/article/title/:id', (req, res) => {
  const articleID = req.params.id;
  connection.query(
      'SELECT a_text FROM article WHERE a_id = ?',
      [articleID],
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

// about

app.get('/about/article/title/:id', (req, res) => {
  const articleID = req.params.id;
  connection.query(
      'SELECT a_title FROM article WHERE a_id = ?',
      [articleID],
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

app.get('/about/article/text/:id', (req, res) => {
  const articleID = req.params.id;
  connection.query(
      'SELECT a_text FROM article WHERE a_id = ?',
      [articleID],
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

// links

app.get('/links/article/title/:id', (req, res) => {
  const articleID = req.params.id;
  connection.query(
      'SELECT a_title FROM article WHERE a_id = ?',
      [articleID],
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

app.get('/links/article/text/:id', (req, res) => {
  const articleID = req.params.id;
  connection.query(
      'SELECT a_text FROM article WHERE a_id = ?',
      [articleID],
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

// dynamic content pages

app.get('/categories/:parentId', (req, res) => {
  const parentId = req.params.parentId;
  connection.query(
    "SELECT * FROM `category` WHERE `c_parent_id` = 1 and `c_active` = '1' and `c_show_in_menu` = '1' order by `c_priority` desc",
    [parentId],
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

app.get('/paths/:pathName', (req, res) => {
  const pathName = `/${req.params.pathName}/`;
  console.log('Path name:', pathName); // Log the pathName

  connection.query(
    'SELECT p_path FROM path WHERE p_name = ?',
    [pathName],
    (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'Path not found' });
        return;
      }

      const pPath = results[0].p_path;
      const pathParts = pPath.split(',');
      const x = pathParts[pathParts.length - 1];
      const y = pathParts[pathParts.length - 2];
      res.json({ p_path: pPath, x: x, y: y });
    }
  );
});

app.get('/subcategories/:parentId', (req, res) => {
  const parentId = req.params.parentId;
  connection.query(
    'SELECT p_path FROM path WHERE p_name = ?',
    [`/${parentId}/`],
    (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'Path not found' });
        return;
      }

      const pPath = results[0].p_path;
      const pathParts = pPath.split(',');
      const x = pathParts[pathParts.length - 1];

      connection.query(
        'SELECT c_name_rus, c_id FROM category WHERE c_parent_id = ?',
        [x],
        (error, results) => {
          if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
          
          const promises = results.map(row => {
            return new Promise((resolve, reject) => {
              const categoryId = row.c_id;
              connection.query(
                'SELECT p_name FROM path WHERE p_path LIKE ?',
                [`%,${categoryId}`],
                (error, results) => {
                  if (error) {
                    console.error('Error executing query:', error);
                    reject(error);
                  } else if (results.length > 0) {
                    const pName = results[0].p_name;
                    const link = `/${pName}/`;
                    resolve({ c_name_rus: row.c_name_rus, link });
                  } else {
                    resolve(null);
                  }
                }
              );
            });
          });
          
          Promise.all(promises)
            .then(subCategories => {
              res.json(subCategories.filter(Boolean));
            })
            .catch(error => {
              console.error('Error:', error);
              res.status(500).json({ error: 'Internal server error' });
            });
        }
      );
    }
  );
});


app.get('/path-details/:pathName', (req, res) => {
  const pathName = `/${req.params.pathName}/`;

  connection.query(
    'SELECT p_path FROM path WHERE p_name = ?',
    [pathName],
    (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'Path not found' });
        return;
      }

      const pPath = results[0].p_path;
      const pathParts = pPath.split(',');
      const x = pathParts[pathParts.length - 1];

      connection.query(
        'SELECT c_name_rus FROM category WHERE c_id = ?',
        [x],
        (error, categoryResults) => {
          if (error) {
            console.error('Error executing category query:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }

          if (categoryResults.length === 0) {
            res.status(404).json({ error: 'Category not found' });
            return;
          }

          connection.query(
            'SELECT a_title, a_text FROM article WHERE c_id = ?',
            [x],
            (error, articleResults) => {
              if (error) {
                console.error('Error executing article query:', error);
                res.status(500).json({ error: 'Internal server error' });
                return;
              }

              let responseData = {
                title: categoryResults[0].c_name_rus,
                articles: articleResults.map(article => ({
                  a_title: article.a_title,
                  a_text: article.a_text
                })),
                c_id: x
              };

              if (x === '53') {
                connection.query(
                  'SELECT title, http_path FROM file WHERE id BETWEEN 8 AND 33',
                  (error, fileResults) => {
                    if (error) {
                      console.error('Error executing file query:', error);
                      res.status(500).json({ error: 'Internal server error' });
                      return;
                    }

                    responseData.files = fileResults;
                    res.json(responseData);
                  }
                );
              } else {
                res.json(responseData);
              }
            }
          );
        }
      );
    }
  );
});













// connection

app.listen(process.env.PORT, () => {
    console.log('Server is running');
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

module.exports = connection;