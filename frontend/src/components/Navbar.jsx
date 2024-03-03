import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from '../images/background.png';
import RedStar from '../images/redStar.png'
import WhiteStar from '../images/whiteStar.png'

const Navbar = () => {
  const location = useLocation();
  const [activePage, setActivePage] = useState(""); // State to store active page

  // Function to handle page changes
  const handlePageChange = (page) => {
    setActivePage(page);
  };

  // Clear active page when navigating back to the main page ("/")
  useEffect(() => {
    if (location.pathname === "/") {
      setActivePage("");
    }
  }, [location.pathname]);

  return (
    <div className="navigation">
        <div className="backgroundImageTwo">
            <img src={Navigation} alt="Background Image" />
        </div>
        <div className="navLinks">
            <div className="linkContainer">
            <Link
                to="/About"
                onClick={() => handlePageChange("About")}
                className={activePage === "About" ? "active" : ""}
            >
                <span className="linkText">База данных</span>
                <img className="starIcon" src={activePage === "About" ? WhiteStar : RedStar} alt="Star Icon" />
            </Link>
            </div>

            <div className="linkContainer">
            <Link
                to="/Links"
                onClick={() => handlePageChange("Links")}
                className={activePage === "Links" ? "active" : ""}
            >
                <span className="linkText">Описание боевых действий</span>
                <img className="starIcon" src={activePage === "Links" ? WhiteStar : RedStar} alt="Star Icon" />
            </Link>
            </div>

            <div className="linkContainer">
            <Link
                to="/Feedback"
                onClick={() => handlePageChange("Feedback")}
                className={activePage === "Feedback" ? "active" : ""}
            >
                <span className="linkText">Список частей и соединений</span>
                <img className="starIcon" src={activePage === "Feedback" ? WhiteStar : RedStar} alt="Star Icon" />
            </Link>
            </div>

            <div className="linkContainer">
            <Link
                to="/Feedback"
                onClick={() => handlePageChange("Feedback")}
                className={activePage === "Feedback" ? "active" : ""}
            >
                <span className="linkText">Биографии командиров</span>
                <img className="starIcon" src={activePage === "Feedback" ? WhiteStar : RedStar} alt="Star Icon" />
            </Link>
            </div>

            <div className="linkContainer">
            <Link
                to="/Feedback"
                onClick={() => handlePageChange("Feedback")}
                className={activePage === "Feedback" ? "active" : ""}
            >
                <span className="linkText">Герои Советского Союза</span>
                <img className="starIcon" src={activePage === "Feedback" ? WhiteStar : RedStar} alt="Star Icon" />
            </Link>
            </div>


            <div className="linkContainer">
            <Link
                to="/Feedback"
                onClick={() => handlePageChange("Feedback")}
                className={activePage === "Feedback" ? "active" : ""}
            >
                <span className="linkText">Оккупационный режим</span>
                <img className="starIcon" src={activePage === "Feedback" ? WhiteStar : RedStar} alt="Star Icon" />
            </Link>
            </div>



            <div className="linkContainer">
            <Link
                to="/Feedback"
                onClick={() => handlePageChange("Feedback")}
                className={activePage === "Feedback" ? "active" : ""}
            >
                <span className="linkText">Партизаны</span>
                <img className="starIcon" src={activePage === "Feedback" ? WhiteStar : RedStar} alt="Star Icon" />
            </Link>
            </div>

            <div className="linkContainer">
            <Link
                to="/Feedback"
                onClick={() => handlePageChange("Feedback")}
                className={activePage === "Feedback" ? "active" : ""}
            >
                <span className="linkText">Эвакуация гражданского населения</span>
                <img className="starIcon" src={activePage === "Feedback" ? WhiteStar : RedStar} alt="Star Icon" />
            </Link>
            </div>




            <div className="linkContainer">
            <Link
                to="/Feedback"
                onClick={() => handlePageChange("Feedback")}
                className={activePage === "Feedback" ? "active" : ""}
            >
                <span className="linkText">Библиография</span>
                <img className="starIcon" src={activePage === "Feedback" ? WhiteStar : RedStar} alt="Star Icon" />
            </Link>
            </div>


            <div className="linkContainer">
            <Link
                to="/Feedback"
                onClick={() => handlePageChange("Feedback")}
                className={activePage === "Feedback" ? "active" : ""}
            >
                <span className="linkText">Литература о войне</span>
                <img className="starIcon" src={activePage === "Feedback" ? WhiteStar : RedStar} alt="Star Icon" />
            </Link>
            </div>

            <div className="linkContainer">
            <Link
                to="/Feedback"
                onClick={() => handlePageChange("Feedback")}
                className={activePage === "Feedback" ? "active" : ""}
            >
                <span className="linkText">Список сокращений</span>
                <img className="starIcon" src={activePage === "Feedback" ? WhiteStar : RedStar} alt="Star Icon" />
            </Link>
            </div>


            <div className="linkContainer">
            <Link
                to="/Feedback"
                onClick={() => handlePageChange("Feedback")}
                className={activePage === "Feedback" ? "active" : ""}
            >
                <span className="linkText">Фотографии</span>
                <img className="starIcon" src={activePage === "Feedback" ? WhiteStar : RedStar} alt="Star Icon" />
            </Link>
            </div>









        </div>

    </div>
);
};

export default Navbar;
