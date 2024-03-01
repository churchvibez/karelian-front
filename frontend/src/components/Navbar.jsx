import React from "react";
import { Link } from "react-router-dom";
import Navigation from '../images/background.png';

const Navbar = () =>
{
    return (
        <div className="navigation">
            <div className="backgroundImageTwo">
                <img src={Navigation} alt="Background Image" />
            </div>
        </div>
    );
}

export default Navbar