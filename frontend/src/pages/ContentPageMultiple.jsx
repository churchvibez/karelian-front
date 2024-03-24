import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { baseUrl } from '../apiConfig';
import parse from 'html-react-parser';

const ContentPageMultiple = () => 
{
  const { param1, param2 } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [content, setContent] = useState([]);
  const [pageTitle, setPageTitle] = useState('');
  const [files, setFiles] = useState([]);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const letterMappingAbbreviations = 
  {
    A: 'А', B: 'Б', V: 'В', G: 'Г', D: 'Д', J: 'Е', ZH: 'Ж', Z: 'З',
    I: 'И', K: 'К', L: 'Л', M: 'М', N: 'Н', O: 'О', P: 'П', R: 'Р',
    S: 'С', T: 'Т', U: 'У', F: 'Ф', H: 'Х', C: 'Ц', CH: 'Ч', SH: 'Ш',
    SCH: 'Щ', Y: 'Ы', E: 'Э', YU: 'Ю', YA: 'Я', 
  };
  const letterMappingBibliography = 
  {
    A: 'А', B: 'Б', V: 'В', G: 'Г', D: 'Д', E: 'Е', ZH: 'Ж', Z: 'З',
    I: 'И', K: 'К', L: 'Л', M: 'М', N: 'Н', O: 'О', P: 'П', R: 'Р',
    S: 'С', T: 'Т', U: 'У', F: 'Ф', H: 'Х', C: 'Ц', CH: 'Ч', SH: 'Ш',
    SCH: 'Щ', Y: 'Ы', YE: 'Э', YU: 'Ю', YA: 'Я', 
  };

  useEffect(() => 
  {
    const fetchContent = async () => 
    {
      let url = '';
      if (location.pathname.includes('/site/biblio')) 
      {
        const russianLetter = letterMappingBibliography[param2.toUpperCase()] || param2;
        fetchBibliographyArticles(russianLetter);
        return;
      } else if (location.pathname.includes('/site/article/')) 
      {
        fetchArticleByAId(param2);
        return;
      } 
      else if (location.pathname.includes('abbreviation')) 
      {
        const russianLetter = letterMappingAbbreviations[param2.toUpperCase()] || param2;
        fetchAbbreviations(russianLetter);
        return;
      }
      else 
      {
        url = `${baseUrl}/paths/${param1}/${param2}`;
      }
      
      adjustPageTitleBasedOnPath();
    
      try {
        if (url) {
          const response = await fetch(url);
          const data = await response.json();
          if (data.title) {
            setPageTitle(data.title);
            setContent(data.articles || []);
          } else {
            setContent(Array.isArray(data) ? data : [data]);
          }
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    const fetchSpecificFiles = async () => 
    {
      let startId, endId;
      if (location.pathname.includes('/occupation/verigin')) 
      {
        startId = 3;
        endId = 7;
      } else if (location.pathname.includes('/site/article/83')) 
      {
        startId = 8;
        endId = 33;
      }

      if (startId && endId) 
      {
        try 
        {
          const response = await fetch(`${baseUrl}/files/range/${startId}/${endId}`);
          const data = await response.json();
          setFiles(data);
        } 
        catch (error) 
        {
          console.error('Error fetching files:', error);
        }
      }
    };

    fetchContent();
    fetchSpecificFiles();
  }, [param1, param2, location.pathname, location.search]);


  const handleImageClick = (src) => 
  {
    setCurrentImageUrl(src);
    setIsImageModalOpen(true);
  };

  const removeATags = (html) => 
  {
    return html.replace(/<a[^>]*>(.*?)<\/a>/g, "$1");
  };
  
  const renderContentWithImages = (htmlContent) => 
  {
    if (typeof htmlContent !== 'string') 
    {
      console.error("Expected a string for htmlContent");
      return null;
    }
    const contentWithoutATags = removeATags(htmlContent);
    return parse(contentWithoutATags, {
      replace: domNode => 
      {
        if (domNode.name === 'img') 
        {
          return (
            <img
              {...domNode.attribs}
              onClick={() => handleImageClick(domNode.attribs.src)}
              style={{ cursor: 'pointer' }}
            />
          );
        }
      }
    });
  };
    
  const adjustPageTitleBasedOnPath = () => 
  {
    const queryParams = new URLSearchParams(location.search);
    const titleFromQuery = queryParams.get('title');
    if (titleFromQuery) 
    {
      setPageTitle(titleFromQuery);
    } 
    else if (location.pathname.includes('/site/commander/front')) 
    {
      setPageTitle("Командующие Карельским фронтом");
    } 
    else 
    {
      setPageTitle(param2.charAt(0).toUpperCase() + param2.slice(1));
    }
  }; 

  const fetchAbbreviations = (letter) => 
  {
    const russianLetter = letterMappingAbbreviations[letter.toUpperCase()] || letter;
    fetch(`${baseUrl}/site/abbreviation/${russianLetter}`)
      .then(response => response.json())
      .then(data => {
        setContent(data);
      })
      .catch(error => console.error('Error fetching abbreviations:', error));
  };
  
  const fetchArticleByAId = async (aId) => 
  {
    try 
    {
      const response = await fetch(`${baseUrl}/site/article/${aId}`);
      const data = await response.json();
      if (location.pathname.includes('/site/article/')) 
      {
        setPageTitle(data.a_title);
      }
      setContent([data]);
    } 
    catch (error) 
    {
      console.error('Error fetching article by ID:', error);
    }
  };

  const fetchBibliographyArticles = (russianLetter) => 
  {
    fetch(`${baseUrl}/site/biblio/${russianLetter}`)
      .then(response => response.json())
      .then(data => {
        setContent(data);
      })
      .catch(error => console.error('Error fetching bibliography articles:', error));
  };
  
  const shouldDisplayTitle = () => 
  {
    return !location.pathname.includes('/site/commander/front') && !location.pathname.includes('/site/article') && !location.pathname.includes('/site/occupation/verigin') && !location.pathname.includes('/site/partisan/kulagin/') && !location.pathname.includes('/site/partisan/kulagin/') && !location.pathname.includes('/site/partisan/biblio/');
  };

  return (
    <div className="generalPages">
      {!(location.pathname.includes('/site/abbreviation') || location.pathname.includes('/site/biblio')) && (
        <div>
          <button className="backButton" onClick={() => navigate(-1)}>
            ←
          </button>    
        </div>
      )}
      <h1>{pageTitle}</h1>
      {content.map((item, index) => (
        <div key={index}>
          {(location.pathname.includes('/site/biblio') || location.pathname.includes('/site/abbreviation')) ? (
            <>
              <h3 dangerouslySetInnerHTML={{ __html: item.a_title }} />
              <div dangerouslySetInnerHTML={{ __html: item.a_text }} />
            </>
          ) : shouldDisplayTitle() && !location.pathname.includes('/site/photo/') ? (
            <Link to={`/site/article/${item.a_id}`} style={{ color: 'black' }}>
              <h3 dangerouslySetInnerHTML={{ __html: item.a_title }} />
            </Link>
          ) : null}
          {!(location.pathname.includes('/site/biblio') || location.pathname.includes('/site/abbreviation')) ? (
            location.pathname.includes('/site/photo') || location.pathname.includes('/site/article') ? (
              <div className="desc">{renderContentWithImages(item.a_text)}</div>
            ) : (
              <div className="desc" dangerouslySetInnerHTML={{ __html: item.a_desc || item.a_text }} />
            )
          ) : null}
        </div>
      ))}
      {(location.pathname.includes('/occupation/verigin') || location.pathname.includes('/site/article/83')) && (
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <a href={file.http_path} target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>{file.title}</a>
            </li>
          ))}
        </ul>
      )}
      {isImageModalOpen && (
      <div className="imageModal" onClick={() => setIsImageModalOpen(false)}>
        <span className="close" onClick={() => setIsImageModalOpen(false)}>&times;</span>
        <img src={currentImageUrl} className="modalContent" alt="Enlarged view" />
      </div>
      )}
    </div>
  );
  
};

export default ContentPageMultiple;
