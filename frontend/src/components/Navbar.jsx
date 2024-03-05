import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from '../images/background.png';
import RedStar from '../images/redStar.png'
import WhiteStar from '../images/whiteStar.png'

const Navbar = () => {
    const location = useLocation();
    const [activePage, setActivePage] = useState(""); 

    const handlePageChange = (page) => {
        setActivePage(page);
    };

    return (
        <div className="navigation">
            <div className="backgroundImageTwo">
                <img src={Navigation} alt="Background Image" />
            </div>
            <div className="navLinks">
                <div className="linkContainer">
                    <Link
                        to="/database"
                        className={location.pathname.startsWith("/database") ? "active" : ""}
                    >
                        <span className="linkText">База данных</span>
                        <img className="starIcon" src={location.pathname === ("/database") ? WhiteStar : RedStar} alt="Star Icon" />
                    </Link>
                    {location.pathname.startsWith("/database") && (
                        <>
                            <Link
                            to="/database/search"
                            className="subLink"
                            onClick={() => handlePageChange("/database")}
                            >
                            <span className="linkTextTwo">Поиск в базе данных</span>
                            <img className="starIconTwo" src={location.pathname === "/database/search" ? WhiteStar : RedStar} alt="Star Icon" />
                            </Link>

                        </>
                    )}
                </div>

                <div className="linkContainer">
                    <Link
                        to="/battles"
                        onClick={() => handlePageChange("battles")}
                        className={activePage === "battles" || location.pathname.startsWith("/battles") ? "active" : ""}
                    >
                        <span className="linkText">Описание боевых действий</span>
                        <img className="starIcon" src={!location.pathname.startsWith("/battles") ? RedStar : WhiteStar} alt="Star Icon" />
                    </Link>
                </div>

                <div className="linkContainer">
                    <Link
                        to="/parts"
                        className={location.pathname.startsWith("/parts") ? "active" : ""}
                    >
                        <span className="linkText">Список частей и соединений</span>
                        <img className="starIcon" src={location.pathname === ("/parts") ? WhiteStar : RedStar} alt="Star Icon" />
                    </Link>
                    {location.pathname.startsWith("/parts") && (
                        <>
                            <Link
                            to="/parts/army"
                            className="subLink"
                            onClick={() => handlePageChange("/army")}
                            >
                            <span className="linkTextTwo">Армии</span>
                            <img className="starIconThree" src={location.pathname === "/parts/army" ? WhiteStar : RedStar} alt="Star Icon" />
                            </Link>
                            <Link
                            to="/parts/corpus"
                            className="subLink"
                            onClick={() => handlePageChange("/corpus")}
                            >
                            <span className="linkTextTwo">Корпуса</span>
                            <img className="starIconFour" src={location.pathname === "/parts/corpus" ? WhiteStar : RedStar} alt="Star Icon" />
                            </Link>
                            <Link
                            to="/parts/divisions"
                            className="subLink"
                            onClick={() => handlePageChange("/divisions")}
                            >
                            <span className="linkTextTwo">Дивизии</span>
                            <img className="starIconFive" src={location.pathname === "/parts/divisions" ? WhiteStar : RedStar} alt="Star Icon" />
                            </Link>
                        </>
                    )}        
                </div>

                <div className="linkContainer">
                    <Link
                        to="/commanders"
                        className={location.pathname.startsWith("/commanders") ? "active" : ""}
                    >
                        <span className="linkText">Биографии командиров</span>
                        <img className="starIcon" src={location.pathname === ("/commanders") ? WhiteStar : RedStar} alt="Star Icon" />
                    </Link>
                    {location.pathname.startsWith("/commanders") && (
                        <>
                            <Link
                            to="/commanders/front"
                            className="subLink"
                            onClick={() => handlePageChange("/front")}
                            >
                            <span className="linkTextTwo">Командующие Карельским фронтом</span>
                            <img className="starIconThree" src={location.pathname === "/commanders/front" ? WhiteStar : RedStar} alt="Star Icon" />
                            </Link>
                            <Link
                            to="/commanders/army"
                            className="subLink"
                            onClick={() => handlePageChange("/army")}
                            >
                            <span className="linkTextTwo">Командующие армиями</span>
                            <img className="starIconFour" src={location.pathname === "/commanders/army" ? WhiteStar : RedStar} alt="Star Icon" />
                            </Link>
                            <Link
                            to="/commanders/corpus"
                            className="subLink"
                            onClick={() => handlePageChange("/corpus")}
                            >
                            <span className="linkTextTwo">Командиры корпусов</span>
                            <img className="starIconFive" src={location.pathname === "/commanders/corpus" ? WhiteStar : RedStar} alt="Star Icon" />
                            </Link>
                            <Link
                            to="/commanders/divisions"
                            className="subLink"
                            onClick={() => handlePageChange("/divisions")}
                            >
                            <span className="linkTextTwo">Командиры дивизий</span>
                            <img className="starIconSix" src={location.pathname === "/commanders/divisions" ? WhiteStar : RedStar} alt="Star Icon" />
                            </Link>
                        </>
                    )}        
                </div>
                
                <div className="linkContainer">
                    <Link
                        to="/heroes"
                        onClick={() => handlePageChange("heroes")}
                        className={activePage === "heroes" || location.pathname.startsWith("/heroes") ? "active" : ""}
                    >
                        <span className="linkText">Герои Советского Союза</span>
                        <img className="starIcon" src={!location.pathname.startsWith("/heroes") ? RedStar : WhiteStar} alt="Star Icon" />
                    </Link>
                </div>
    
                <div className="linkContainer">
                    <Link
                        to="/occupation"
                        className={location.pathname.startsWith("/occupation") ? "active" : ""}
                    >
                        <span className="linkText">Оккупационный режим</span>
                        <img className="starIcon" src={location.pathname === ("/occupation") ? WhiteStar : RedStar} alt="Star Icon" />
                    </Link>
                    {location.pathname.startsWith("/occupation") && (
                        <>
                            <Link
                            to="/occupation/remembering"
                            className="subLink"
                            onClick={() => handlePageChange("/occupation")}
                            >
                            <span className="linkTextTwo">Воспоминания</span>
                            <img className="starIconTwo" src={location.pathname === "/occupation/remembering" ? WhiteStar : RedStar} alt="Star Icon" />
                            </Link>

                        </>
                    )}
                </div>

                <div className="linkContainer">
                    <Link
                        to="/partisans"
                        onClick={() => handlePageChange("partisans")}
                        className={activePage === "partisans" || location.pathname.startsWith("/partisans") ? "active" : ""}
                    >
                        <span className="linkText">Партизаны</span>
                        <img className="starIcon" src={!location.pathname.startsWith("/partisans") ? RedStar : WhiteStar} alt="Star Icon" />
                    </Link>
                </div>

                <div className="linkContainer">
                    <Link
                        to="/evacuation"
                        onClick={() => handlePageChange("evacuation")}
                        className={activePage === "evacuation" || location.pathname.startsWith("/evacuation") ? "active" : ""}
                    >
                        <span className="linkText">Эвакуация гражданского населения</span>
                        <img className="starIcon" src={!location.pathname.startsWith("/evacuation") ? RedStar : WhiteStar} alt="Star Icon" />
                    </Link>
                </div>

                <div className="linkContainer">
                    <Link
                        to="/bibliography"
                        onClick={() => handlePageChange("bibliography")}
                        className={activePage === "bibliography" || location.pathname.startsWith("/bibliography") ? "active" : ""}
                    >
                        <span className="linkText">Библиография</span>
                        <img className="starIcon" src={!location.pathname.startsWith("/bibliography") ? RedStar : WhiteStar} alt="Star Icon" />
                    </Link>
                </div>

                <div className="linkContainer">
                    <Link
                        to="/literature"
                        onClick={() => handlePageChange("literature")}
                        className={activePage === "literature" || location.pathname.startsWith("/literature") ? "active" : ""}
                    >
                        <span className="linkText">Литература о войне</span>
                        <img className="starIcon" src={!location.pathname.startsWith("/literature") ? RedStar : WhiteStar} alt="Star Icon" />
                    </Link>
                </div>

                <div className="linkContainer">
                    <Link
                        to="/abbreviations"
                        onClick={() => handlePageChange("abbreviations")}
                        className={activePage === "abbreviations" || location.pathname.startsWith("/abbreviations") ? "active" : ""}
                    >
                        <span className="linkText">Список сокращений</span>
                        <img className="starIcon" src={!location.pathname.startsWith("/abbreviations") ? RedStar : WhiteStar} alt="Star Icon" />
                    </Link>
                </div>



                <div className="linkContainer">
                    <Link
                        to="/photos"
                        className={location.pathname.startsWith("/photos") ? "active" : ""}
                    >
                        <span className="linkText">Фотографии</span>
                        <img className="starIcon" src={location.pathname === ("/photos") ? WhiteStar : RedStar} alt="Star Icon" />
                    </Link>
                    {location.pathname.startsWith("/photos") && (
                        <>
                            <Link
                            to="/photos/ptz"
                            className="subLink"
                            onClick={() => handlePageChange("/ptz")}
                            >
                            <span className="linkTextTwo">Петрозаводск после отступления Красной Армии</span>
                            <img className="starIconTwo" src={location.pathname === "/photos/ptz" ? WhiteStar : RedStar} alt="Star Icon" />
                            </Link>
                            <Link
                            to="/photos/finn"
                            className="subLink"
                            onClick={() => handlePageChange("/finn")}
                            >
                            <span className="linkTextTwo">Финские войска в Петрозаводске</span>
                            <img className="starIconFour" src={location.pathname === "/photos/finn" ? WhiteStar : RedStar} alt="Star Icon" />
                            </Link>
                            <Link
                            to="/photos/new"
                            className="subLink"
                            onClick={() => handlePageChange("/new")}
                            >
                            <span className="linkTextTwo">"Новые хозяева" Петрозаводска</span>
                            <img className="starIconFive" src={location.pathname === "/photos/new" ? WhiteStar : RedStar} alt="Star Icon" />
                            </Link>
                            <Link
                            to="/photos/occupation"
                            className="subLink"
                            onClick={() => handlePageChange("/occupation")}
                            >
                            <span className="linkTextTwo">Гражданское население в период оккупации</span>
                            <img className="starIconSix" src={location.pathname === "/photos/occupation" ? WhiteStar : RedStar} alt="Star Icon" />
                            </Link>
                            <Link
                            to="/photos/prison"
                            className="subLink"
                            onClick={() => handlePageChange("/prison")}
                            >
                            <span className="linkTextTwo">В финском плену</span>
                            <img className="starIconSeven" src={location.pathname === "/photos/prison" ? WhiteStar : RedStar} alt="Star Icon" />
                            </Link>
                            <Link
                            to="/photos/finnAndGer"
                            className="subLink"
                            onClick={() => handlePageChange("/finnAndGer")}
                            >
                            <span className="linkTextTwo">Финские и немецкие укрепления на Карельском фронте</span>
                            <img className="starIconEight" src={location.pathname === "/photos/finnAndGer" ? WhiteStar : RedStar} alt="Star Icon" />
                            </Link>
                            <Link
                            to="/photos/tech"
                            className="subLink"
                            onClick={() => handlePageChange("/tech")}
                            >
                            <span className="linkTextTwo">Военная техника</span>
                            <img className="starIconNine" src={location.pathname === "/photos/tech" ? WhiteStar : RedStar} alt="Star Icon" />
                            </Link>
                            <Link
                            to="/photos/national"
                            className="subLink"
                            onClick={() => handlePageChange("/national")}
                            >
                            <span className="linkTextTwo">Фотографии Национального архива Финляндии</span>
                            <img className="starIconTen" src={location.pathname === "/photos/national" ? WhiteStar : RedStar} alt="Star Icon" />
                            </Link>
                        </>
                    )}        
                </div>
            </div>
        </div>
    );
};

export default Navbar;
