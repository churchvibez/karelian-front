import React, { useState, useEffect } from 'react';
import { aboutUrlTitle, aboutUrlText } from '../apiConfig';

const About = () => {
  const [aboutTitle, setAboutTitle] = useState('');
  const [aboutText, setAboutText] = useState('');

  useEffect(() => {
    fetch(aboutUrlTitle)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setAboutTitle(data[0].a_title);
        }
      })
      .catch(error => console.error('Error fetching data:', error));

      fetch(aboutUrlText)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setAboutText(data[0].a_text);
        }
      })
      .catch(error => console.error('Error fetching data:', error));

  }, []);

  return (
    <div className="generalPages">
      <div>
        <div>
          <h2>{aboutTitle}</h2>
        </div>
        <div>
        <p dangerouslySetInnerHTML={{ __html: aboutText }} />
        </div>
      </div>
    </div>
  );
};

export default About;
