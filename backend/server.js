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

// home page

app.get('/home/article/title/:id', (req, res) => 
{
  const articleID = req.params.id;
  connection.query(
    'SELECT a_text FROM article WHERE a_id = ?',
    [articleID],
    (error, results) => 
    {
      if (error) 
      {
          console.error('Error executing query:', error);
          res.status(500).json({ error: 'Internal server error' });
          return;
      }
      res.json(results);
    }
  );
});

// navigation bar

app.get('/categories/:parentId', (req, res) => 
{
  const parentId = req.params.parentId;
  connection.query(
    "SELECT * FROM category WHERE c_parent_id = 1 and c_active = '1' and c_show_in_menu = '1' order by c_priority desc",
    [parentId],
    (error, results) => 
    {
      if (error) 
      {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(results);
    }
  );
});

app.get('/navSubCat/:parentId', (req, res) => 
{
  const parentId = req.params.parentId;
  connection.query(
    'SELECT * FROM category WHERE c_parent_id = ? AND c_active = "1"',
    [parentId],
    (error, results) => 
    {
      if (error) 
      {
        console.error('Error fetching subcategories:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(results);
    }
  );
});

// path for every page based on URL

app.get('/paths/:pathName', (req, res) => 
{
  const pathName = `/${req.params.pathName}/`;
  console.log('Path name:', pathName);
  connection.query(
    'SELECT p_path FROM path WHERE p_name = ?',
    [pathName],
    (error, results) => 
    {
      if (error) 
      {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      if (results.length === 0) 
      {
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

app.get('/paths/:paramOne/:paramTwo', (req, res) => {
  const { paramOne, paramTwo } = req.params;
  const fullPath = `/${paramOne}/${paramTwo}/`;
  connection.query(
    'SELECT p_path FROM path WHERE p_name = ?',
    [fullPath],
    (error, pathResults) => {
      if (error) {
        console.error('Error finding path:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (pathResults.length === 0) {
        return res.status(404).json({ error: 'Path not found' });
      }

      const pPathArray = pathResults[0].p_path.split(',');
      const cId = parseInt(pPathArray[pPathArray.length - 1], 10);
      let title = '';
      const fetchTitleFirst = async () => {
        if ([52, 83].includes(cId)) {
          return new Promise((resolve, reject) => {
            connection.query(
              'SELECT c_name_rus FROM category WHERE c_id = ?',
              [cId],
              (error, categoryResults) => {
                if (error) {
                  console.error('Error fetching category title:', error);
                  reject(error);
                } else if (categoryResults.length > 0) {
                  title = categoryResults[0].c_name_rus;
                  resolve();
                } else {
                  reject('Category not found');
                }
              }
            );
          });
        } else {
          return Promise.resolve();
        }
      };

      fetchTitleFirst().then(() => {
        connection.query(
          'SELECT a_title, a_text, a_desc FROM article WHERE c_id = ?',
          [cId],
          (error, articles) => {
            if (error) {
              console.error('Error fetching articles:', error);
              return res.status(500).json({ error: 'Internal server error' });
            }

            const responseJson = {
              title: title || (articles.length > 0 ? articles[0].a_title : ''),
              articles: articles
            };
            res.json(responseJson);
          }
        );
      }).catch(error => {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
    }
  );
});


// title and text for every page with article within the URL

app.get('/site/article/:aId', (req, res) => 
{
  const { aId } = req.params;
  const query = 'SELECT a_title, a_text FROM article WHERE a_id = ?';
  connection.query(query, [aId], (error, results) => 
  {
      if (error) 
      {
          console.error('Error fetching article:', error);
          return res.status(500).json({ error: 'Internal server error' });
      }
      if (results.length > 0) 
      {
          res.json(results[0]);
      } 
      else 
      {
          res.status(404).json({ error: 'Article not found' });
      }
  });
});

// files

app.get('/files/range/:startId/:endId', (req, res) => 
{
  const { startId, endId } = req.params;
  const query = 'SELECT title, path, http_path FROM file WHERE id BETWEEN ? AND ?';

  connection.query(query, [startId, endId], (error, results) => 
  {
    if (error) 
    {
      console.error('Error fetching files:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
  });
});

// subcategories listed when the parent page is open

app.get('/subcategories/:parentId', (req, res) => 
{
  const parentId = req.params.parentId;
  connection.query(
    'SELECT p_path FROM path WHERE p_name = ?',
    [`/${parentId}/`],
    (error, results) => 
    {
      if (error) 
      {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      if (results.length === 0) 
      {
        res.status(404).json({ error: 'Path not found' });
        return;
      }

      const pPath = results[0].p_path;
      const pathParts = pPath.split(',');
      const x = pathParts[pathParts.length - 1];

      connection.query(
        'SELECT c_name_rus, c_id FROM category WHERE c_parent_id = ?',
        [x],
        (error, results) => 
        {
          if (error) 
          {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
          
          const promises = results.map(row => {
            return new Promise((resolve, reject) => 
            {
              const categoryId = row.c_id;
              connection.query(
                'SELECT p_name FROM path WHERE p_path LIKE ?',
                [`%,${categoryId}`],
                (error, results) => 
                {
                  if (error) 
                  {
                    console.error('Error executing query:', error);
                    reject(error);
                  } 
                  else if (results.length > 0) 
                  {
                    const pName = results[0].p_name;
                    const link = `/${pName}/`;
                    resolve({ c_name_rus: row.c_name_rus, link });
                  } 
                  else 
                  {
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

// title, text and files if existing for subcategory pages

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
        'SELECT a_title, a_text FROM article WHERE c_id = ?',
        [x],
        (error, articleResults) => {
          if (error) {
            console.error('Error executing article query:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
          if (articleResults.length > 0) {
            let responseData = {
              title: articleResults[0].a_title,
              articles: articleResults.map(article => ({
                a_title: article.a_title,
                a_text: article.a_text
              })),
              c_id: x
            };
            addFilesIfNeeded(x, responseData, res);
          } else {
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

                let responseData = {
                  title: categoryResults[0].c_name_rus,
                  articles: [],
                  c_id: x
                };
                addFilesIfNeeded(x, responseData, res);
              }
            );
          }
        }
      );
    }
  );
});

function addFilesIfNeeded(c_id, responseData, res) {
  if (c_id === '53') {
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


// bibliography letters

app.get('/site/biblio/:letter', (req, res) => 
{
  const letter = req.params.letter.toUpperCase();
  const query = `
    SELECT a_id, a_title, a_text 
    FROM article 
    WHERE RIGHT(a_title, 1) = ? 
    AND a_title LIKE 'Источники %'
  `;
  connection.query(query, [letter], (error, results) => 
  {
    if (error) 
    {
      console.error('Error executing query:', error);
      return res.status(500).send('Internal server error');
    }
    res.json(results);
  });
});

// soldiers

app.get('/soldiers', (req, res) => 
{
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const offset = (page - 1) * limit;
  connection.query(
    'SELECT a_title, a_text FROM article WHERE c_id = 90 LIMIT ?, ?', 
    [offset, limit],
    (error, results) => 
    {
      if (error) 
      {
        console.error('Error fetching soldiers:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(results);
    }
  );
});

// heroes

app.get('/heroes/:page', async (req, res) => 
{
  const page = parseInt(req.params.page, 10) || 1;
  const limit = 20;
  const offset = (page - 1) * limit;
  try 
  {
    const [results] = await connection.promise().query(
      'SELECT a_id, a_title, a_text FROM article WHERE c_id = 90 LIMIT ?, ?', 
      [offset, limit]
    );
    const [[{ total }]] = await connection.promise().query(
      'SELECT COUNT(*) AS total FROM article WHERE c_id = 90'
    );
    const totalPages = Math.ceil(total / limit);
    res.json({ results, totalPages });
  } 
  catch (error) 
  {
    console.error('Error fetching heroes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// literature

app.get('/literature', async (req, res) => 
{
  const query = 'SELECT a_id, a_title, a_desc FROM article WHERE c_id = ?';
  connection.query(query, [53], (error, results) => 
  {
    if (error) 
    {
        console.error('Error fetching literature:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
  });
});

// abbreviations

app.get('/site/abbreviation/:letter', (req, res) => 
{
  const letter = req.params.letter.toUpperCase();
  const query = `
    SELECT a_id, a_title, a_text 
    FROM article 
    WHERE RIGHT(a_title, 1) = ? 
    AND a_title LIKE 'Список %'
  `;
  connection.query(query, [letter], (error, results) => 
  {
    if (error) 
    {
      console.error('Error executing query:', error);
      return res.status(500).send('Internal server error');
    }
    res.json(results);
  });
});

// search results for soldiers

app.get('/soldiers/search', async (req, res) => 
{
  const { surname, name, fathername, page = 1 } = req.query;
  const limit = 20;
  const offset = (page - 1) * limit;

  let countQuery = `SELECT COUNT(*) AS total FROM soldiers WHERE s_surname LIKE ? AND s_name LIKE ? AND s_fathername LIKE ?`;
  let query = `SELECT * FROM soldiers WHERE s_surname LIKE ? AND s_name LIKE ? AND s_fathername LIKE ? LIMIT ? OFFSET ?`;

  try 
  {
    const totalResults = await connection.promise().query(countQuery, [`%${surname || ''}%`, `%${name || ''}%`, `%${fathername || ''}%`]);
    const total = totalResults[0][0].total;
    const totalPages = Math.ceil(total / limit);
    const results = await connection.promise().query(query, [`%${surname || ''}%`, `%${name || ''}%`, `%${fathername || ''}%`, limit, offset]);
    res.json({
      results: results[0],
      totalPages,
      currentPage: parseInt(page, 10)
    });
  } 
  catch (error) 
  {
    console.error('Error fetching search results:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// connection

app.listen(process.env.PORT, () => 
{
    console.log('Server is running');
});

connection.connect((err) => 
{
  if (err) 
  {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

module.exports = connection;