import React, { useState, useEffect } from 'react';
import { linksUrlTitle, linksUrlText } from '../apiConfig';

const Links = () => {
  const [linksTitle, setLinksTitle] = useState('');
  const [linksText, setLinksText] = useState('');

  useEffect(() => {
    fetch(linksUrlTitle)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setLinksTitle(data[0].a_title);
        }
      })
      .catch(error => console.error('Error fetching data:', error));

      fetch(linksUrlText)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setLinksText(data[0].a_text);
        }
      })
      .catch(error => console.error('Error fetching data:', error));

  }, []);

  return (
    <div className="generalPages">
      <div>
        <div>
          <h2>{linksTitle}</h2>
        </div>
        <div>
        <p dangerouslySetInnerHTML={{ __html: linksText }} />
        </div>
      </div>
    </div>
  );
};

export default Links;
