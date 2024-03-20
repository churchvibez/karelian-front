import React from "react";
import Bottom from '../images/medal2.png';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="footerContainer">
            <div className="footerMedal">
                <img src={Bottom} alt="Background Image" />
            </div>
            <div className="footerText">
                <h2>© Чащин Леонид Михайлович</h2>
                <h2>Петрозаводский государственный университет</h2>
            <div className="links">
                <Link to="/site/about">О проекте</Link>
                <span>|</span>
                <Link to="/site/links">Ссылки</Link>
                <span>|</span>
                <Link to="/site/feedback">Обратная связь</Link>
            </div>
        </div>
    </div>
    );
};

export default Footer;
