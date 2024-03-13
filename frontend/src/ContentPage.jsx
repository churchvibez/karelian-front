import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { contentSinglePathDetails, contentSingleSubCategories } from './apiConfig';

const ContentPage = () => {
  const { pathName } = useParams();
  const [pathInfo, setPathInfo] = useState(null);
  const [articles, setArticles] = useState([]);
  const [files, setFiles] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    fetchPathDetails(pathName);
    fetchSubCategories(pathName);

    return () => {
      setFiles([]);
    };
  }, [pathName]);

  const fetchPathDetails = (pathName) => {
    fetch(`${contentSinglePathDetails}/${pathName}`)
      .then(response => response.json())
      .then(data => {
        console.log('Path Details from Backend:', data);
        setPathInfo(data);
        if (data && data.articles) {
          setArticles(data.articles);
        }
        if (data && data.files) {
          setFiles(data.files);
        }
      })
      .catch(error => console.error('Error fetching path details:', error));
  };

  const fetchSubCategories = (pathName) => {
    fetch(`${contentSingleSubCategories}/${pathName}`)
      .then(response => response.json())
      .then(data => {
        console.log('Subcategories from Backend:', data);
        setSubCategories(data.map(category => ({
          ...category,
          link: `/site${category.link.replace(/^\/|\/$/g, '')}`
        })));
      })
      .catch(error => console.error('Error fetching subcategories:', error));
  };

  return (
    <div className="generalPages">
      {pathInfo ? (
        <div>
          <h2>{pathInfo.title}</h2>
          <ul>
            {subCategories.map((category, index) => (
              <li key={index}>
                <a href={category.link}>{category.c_name_rus}</a>
              </li>
            ))}
          </ul>
          {articles.map((article, index) => (
            <div key={index}>
              <h3>{article.a_title}</h3>
              <div dangerouslySetInnerHTML={{ __html: article.a_text }}></div>
            </div>
          ))}
          <ul>
            {files.map((file, index) => (
              <li key={index}>
                <a href={file.http_path}>{file.title}</a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>error with loading content somewhere</p>
      )}
    </div>
  );
};

export default ContentPage;
