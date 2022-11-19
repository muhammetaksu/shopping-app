import React from "react";
import Departments from "./layout/Departments";
import Filter from "./layout/Filter";
import NavbarCategories from "./layout/NavbarCategories";
import SiteHome from "./layout/SiteHome";

function HomePage() {
    return (
        <>
            <NavbarCategories />
            <div className="m-0 p-0 row d-flex justify-content-center">
                <Departments />
                <div className="home">
                    <Filter />
                    <SiteHome />
                </div>
            </div>
        </>
    );
}

export default HomePage;