import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch('http://localhost:1337/categories/1')
      .then(response => response.json())
      .then(data => {
        setCategories(data);
      })
      .catch(error => console.error('Error fetching categories:', error));
  };

  return (
    <div className="navigation">
      <div className="linkContainer">
        {categories.map(category => (
          <Link
            key={category.c_name}
            to={`/site/${category.c_name}`} // Prepend "/site/" to the route
          >
            {category.c_name_rus}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
