import React from "react";
import Background from '../images/top3.png';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <Link to="/">
            <div className="headerContainer">
            <div className="backgroundImageOne">
               <img src={Background} alt="Background Image" />
            </div>
            <div className="headerTextOne">
                <h1>КАРЕЛЬСКИЙ ФРОНТ</h1>
            </div>
            <div className="headerTextTwo">
                <h2>БЕЗВОЗРАТНЫЕ ПОТЕРИ ЧАСТЕЙ И СОЕДИНЕНИЙ КАРЕЛЬСКОГО ФРОНТА 1941-1944 ГГ.</h2>
            </div>
        </div>
        </Link>
    );
};

export default Header;
