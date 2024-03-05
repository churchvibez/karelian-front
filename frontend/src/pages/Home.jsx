import React, { useState, useEffect } from 'react';
import { apiUrl } from '../apiConfig';

const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="generalPages">
      <div className="home">
        <h2>Articles:</h2>
        <ul>
          {articles.map((article, index) => (
            <li key={index}>{article.a_title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
