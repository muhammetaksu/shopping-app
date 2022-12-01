import React from "react";
import { Navigate, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Orders from "./components/Orders";
import ProfileDetail from "./components/ProfileDetail";
import Addresses from "./components/address/Addresses";

function ProfilePage() {
    const { currentUser } = useSelector((state) => state.userReducer);

    const activeLink = ({ isActive }) => (isActive ? "activeNavLink" : "");

    return (
        <div className="container profilePageCont ">
            <div>
                <h2 className="text-center">
                    Welcome {currentUser.name + " " + currentUser.surname} !
                </h2>
            </div>

            <div className="row profilePageContent">
                <div>
                    <div className="profilePageLinks">
                        <NavLink className={activeLink} to="detail">
                            Profile Detail
                        </NavLink>
                        <NavLink className={activeLink} to="orders">
                            Orders
                        </NavLink>
                        <NavLink className={activeLink} to="addresses">
                            Addresses
                        </NavLink>
                    </div>
                    <div className="profilePageRoutes">
                        <Routes>
                            <Route
                                path="detail"
                                element={<ProfileDetail currentUser={currentUser} />}
                            />
                            <Route path="orders" element={<Orders user={currentUser} />} />
                            <Route
                                path="addresses/*"
                                element={<Addresses currentUser={currentUser} />}
                            />

                            <Route path="" element={<Navigate to={"detail"} />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
