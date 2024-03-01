import React from "react";
import Background from '../images/topcover.jpg';

const Header = () => {
    return (
        <div className="backgroundContainer">
            <div className="backgroundImageOne">
               <img src={Background} alt="Background Image" />
            </div>
        </div>
    );
};

export default Header;
