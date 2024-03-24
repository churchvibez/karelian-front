import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import { baseUrl } from '../apiConfig';
import backgroundImage from '../images/background.png';
import whiteStar from '../images/whiteStar.png';
import redStar from '../images/redStar.png';

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${baseUrl}/categories/1`);
        const data = await response.json();
        setCategories(data);
        const currentPath = location.pathname.split('/')[2] || '';
        const activeCategory = data.find(category => category.c_name === currentPath);
        
        if (activeCategory) {
          setActiveCategoryId(activeCategory.c_id);
          if (![2, 11, 42, 44, 45].includes(activeCategory.c_id)) {
            fetchSubCategories(activeCategory.c_id);
          } else {
            setSubCategories([]);
          }
        } else {
          setActiveCategoryId(null);
          setSubCategories([]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, [location.pathname]);
  
  const fetchSubCategories = (categoryId) => {
    fetch(`${baseUrl}/navSubCat/${categoryId}`)
      .then(response => response.json())
      .then(data => {
        setSubCategories(data);
      })
      .catch(error => console.error('Error fetching subcategories:', error));
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategoryId(activeCategoryId === categoryId ? null : categoryId);
  };

  const getStarImage = (categoryName, subCategoryName = null) => {
    const currentPath = location.pathname.split('/')[2] || '';
    const currentSubPath = location.pathname.split('/')[3] || '';

    if (currentPath === categoryName) {
      return whiteStar;
    } else if (subCategoryName && currentPath === categoryName && currentSubPath === subCategoryName) {
      return whiteStar;
    } else if (activeCategoryId && subCategories.length > 0 && currentPath === categoryName) {
      return whiteStar;
    }
    return redStar;
  };

  return (
    <div className="navigation">
      <img src={backgroundImage} alt="Background" className="backgroundImageTwo"/>
      <div className="navLinks">
        {categories.map((category, index) => (
          <div key={index} className="categoryContainer">
            <div className="linkWithStar" onClick={() => handleCategoryClick(category.c_id)}>
              <Link to={`/site/${category.c_name}`} className="navLink">
                {category.c_name_rus}
              </Link>
              <img src={getStarImage(category.c_name)} alt="Star" className="starIcon" />
            </div>
            {activeCategoryId === category.c_id && subCategories.map((subCat, subIndex) => (
              <div key={subIndex} className="linkWithStar">
                <Link to={`/site/${category.c_name}/${subCat.c_name}?title=${encodeURIComponent(subCat.c_name_rus)}`} className="navLink subCategoryLink">
                  {subCat.c_name_rus}
                </Link>
                <img src={getStarImage(category.c_name, subCat.c_name)} alt="Star" className="starIcon" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
