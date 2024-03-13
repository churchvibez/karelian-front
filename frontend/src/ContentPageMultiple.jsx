import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import {contentMultipleCategoryContent} from './apiConfig'

const ContentPageMultiple = () => {
  const { param1, param2 } = useParams();
  const [categoryContent, setCategoryContent] = useState('');

  useEffect(() => {
    console.log("param1:", param1);
    console.log("param2:", param2);
    fetchCategoryContent(param1, param2);
  }, [param1, param2]);

  const fetchCategoryContent = (param1, param2) => {
    console.log("Fetching content for parameters:", param1, param2);
    fetch(`${contentMultipleCategoryContent}/${param1}/${param2}`)
      .then(response => response.json())
      .then(data => {
        console.log("Category content:", data);
        setCategoryContent(data);
      })
      .catch(error => console.error('Error fetching category content:', error));
  };

  console.log("Render categoryContent:", categoryContent);

  return (
    <div className="generalPages">
      <p>{categoryContent.length > 0 && categoryContent[0].p_name_rus}</p>
    </div>
  );
};

export default ContentPageMultiple;
