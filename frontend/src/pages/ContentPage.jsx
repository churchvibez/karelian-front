import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { baseUrl } from "../apiConfig";
import queryString from 'query-string';

const ContentPage = () => 
{
  const navigate = useNavigate();
  const location = useLocation();
  const { pathName } = useParams();
  const { page = 1, letter } = queryString.parse(location.search);
  const [pathInfo, setPathInfo] = useState(null);
  const [articles, setArticles] = useState([]);
  const [files, setFiles] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [soldiers, setSoldiers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0); 
  const [literature, setLiterature] = useState([]) 
  
  useEffect(() => 
  {
    fetchPathDetails(pathName);
    fetchSubCategories(pathName);
    const queryParams = queryString.parse(location.search);
    const updatedPage = parseInt(queryParams.page, 10) || 1;
    setCurrentPage(updatedPage);

    if(location.pathname === '/site/biblio') 
    {
      navigate('/site/biblio/A/');
    }
    else if(location.pathname === '/site/abbreviation') 
    {
      navigate('/site/abbreviation/A');
    }
    else if (pathName.includes('heroes')) 
    {
      if (letter) 
      {
        fetchSoldiersByLetter(letter);
      } 
      else 
      {
        fetchSoldiers(page);
      }
    }
    else if (pathName.includes('lit')) {
      fetchLiterature();
    }

    return () => {
      setFiles([]);
    };
  }, [pathName, currentPage, location.search]);

  const fetchLiterature = () => 
  {
    fetch(`${baseUrl}/literature`)
      .then(response => response.json())
      .then(data => {
        setLiterature(data);
      })
      .catch(error => console.error('Error fetching literature:', error));
  };

  const fetchSoldiers = (currentPage) => 
  {
    fetch(`${baseUrl}/heroes/${currentPage}`)
      .then(response => response.json())
      .then(({ results, totalPages }) => {
        setSoldiers(results); 
        setTotalNumberOfPages(totalPages);
      })
      .catch(error => console.error('Error fetching soldiers:', error));
  };

  const fetchSoldiersByLetter = (currentLetter) => 
  {
    fetch(`${baseUrl}/soldiers/letter/${currentLetter}`)
      .then(response => response.json())
      .then(data => setSoldiers(data))
      .catch(error => console.error('Error fetching soldiers:', error));
  };

  const fetchPathDetails = (pathName) => 
  {
    fetch(`${baseUrl}/path-details/${pathName}`)
      .then(response => response.json())
      .then(data => {
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

  const fetchSubCategories = (pathName) => 
  {
    fetch(`${baseUrl}/subcategories/${pathName}`)
      .then(response => response.json())
      .then(data => {
        setSubCategories(data.map(category => {
          const queryParams = new URLSearchParams({ title: category.c_name_rus }).toString();
          const link = `/site${category.link.replace(/^\/|\/$/g, '')}?${queryParams}`;
          return { ...category, link };
        }));
      })
      .catch(error => console.error('Error fetching subcategories:', error));
  };
  
  const isSpecialLayoutNeeded = () => 
  {
    return pathInfo && (pathInfo.c_id === 45 || pathInfo.c_id === 11);
  };

  const changePage = (newPage) => 
  {
    const basePagePath = `/site/${pathName}`;
    const searchParams = new URLSearchParams();
    if (letter) 
    {
      searchParams.set('letter', letter);
    }
    searchParams.set('page', newPage.toString());
    navigate(`${basePagePath}?${searchParams.toString()}`);
  };
  
  const renderPagination = () => {
    let startPage = Math.max(currentPage - 5, 1);
    let endPage = Math.min(startPage + 9, totalNumberOfPages);
    if (endPage - startPage < 9) 
    {
      startPage = Math.max(1, endPage - 9);
    }
    const paginationItems = [];
    for (let page = startPage; page <= endPage; page++) 
    {
      paginationItems.push(
        <button key={page} disabled={page === currentPage} onClick={() => changePage(page)}>
          {page}
        </button>
      );
    }
  
    return (
      <div className="pagination">
        <button onClick={() => changePage(1)} disabled={currentPage === 1}>&lt;&lt;</button>
        <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
        {paginationItems}
        <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalNumberOfPages}>&gt;</button>
        <button onClick={() => changePage(totalNumberOfPages)} disabled={currentPage === totalNumberOfPages}>&gt;&gt;</button>
      </div>
    );
  };
    
  return (
    <div className="generalPages">
      {pathInfo && !pathName.includes('heroes') && !pathName.includes('lit') ? (
        <div>
          <h2>{pathInfo.title}</h2>
          <ul className={`subCategoryList ${isSpecialLayoutNeeded() ? 'specialLayout' : ''}`}>
            {subCategories.map((category, index) => (
              <li style={{ color: 'black' }} key={index}>
                <a href={category.link} style={{ color: 'black' }}>{category.c_name_rus}</a>
              </li>
            ))}
          </ul>
          {articles.map((article, index) => (
            <div key={index}>
              <div className="articleText" dangerouslySetInnerHTML={{ __html: article.a_text }}></div>
            </div>
          ))}
          <ul>
            {files.map((file, index) => (
              <li style={{ color: 'black' }} key={index}>
                <a href={file.http_path} style={{ color: 'black' }}>{file.title}</a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {pathName.includes('lit') && (
        <>
          <h2>Литература о войне</h2>
          <ul className="litList">
            {literature.map((item, index) => (
              <li style={{ color: 'black' }} key={index}>
                <Link to={`/site/article/${item.a_id}`} style={{ color: 'black' }}>
                  <span dangerouslySetInnerHTML={{ __html: item.a_title.trim() }} />
                </Link>
                <div className="desc" dangerouslySetInnerHTML={{ __html: item.a_desc.trim() }} />
              </li>
            ))}
          </ul>
        </>
      )}
      {pathName.includes('heroes') && (
        <>
          <h2>Герои Советского Союза</h2>
          <ul className="heroesList">
            {soldiers.map((soldier, index) => (
              <li style={{ color: 'black' }} key={index}>
                <Link to={`/site/article/${soldier.a_id}`} style={{ color: 'black' }}>
                  {soldier.a_title}
                </Link>
              </li>
            ))}
          </ul>
          {renderPagination()}
        </>
      )}
    </div>
  );
  
};

export default ContentPage;
