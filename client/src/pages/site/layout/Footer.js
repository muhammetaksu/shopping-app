import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <div className="footerContainer d-flex">
            <div className="row">
                <div className="col-md-4 d-flex justify-content-center">
                    <Link className="footerLogo">
                        <img src="./assets/icons/bx_bxl-amazon.png" alt="logo" />
                    </Link>
                </div>
                <div className="col-md-4 footerDesc">
                    <p>Online Shopping App | {year}</p>
                </div>
                <div className="col-md-4 footerLinks">
                    <Link to="/contact">Contact us</Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;
