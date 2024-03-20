import React, { useState, useEffect } from 'react';
import { baseUrl } from '../apiConfig';
import MainPage from '../images/mainPage.jpg';

const Home = () => 
{
  const [homeText, setHomeText] = useState('');

  useEffect(() => 
  {
    fetch(`${baseUrl}/home/article/title/33`)
      .then((response) => response.json())
      .then((data) => 
      {
        if (Array.isArray(data) && data.length > 0) 
        {
          const modifiedText = data[0].a_text.replace(/<img[^>]*src=["'][^"']*\/spacer\.gif["'][^>]*>/gi, '');
          const finalText = modifiedText.replace(/<img[^>]*src=["'][^"']*["'][^>]*>/gi, `<img src="${MainPage}" alt="Main Page" />`);
          setHomeText(finalText);
        }
      })
      .catch((error) => console.error('Error fetching articles:', error));
  }, []);

  return (
    <div className="generalPages">
      <div dangerouslySetInnerHTML={{ __html: homeText }} />
    </div>
  );
};

export default Home;
