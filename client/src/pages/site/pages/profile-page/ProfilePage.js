import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, NavLink, Route, Router, Routes, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Orders from "./components/Orders";
import ProfileDetail from "./components/ProfileDetail";
import axios from "axios";
import { API_URL } from "../../../../env/config";
import Addresses from "./components/address/Addresses";

function ProfilePage() {
    const { currentUser } = useSelector((state) => state.userReducer);
    const [userDetail, setUserDetail] = useState({});

    const activeLink = ({ isActive }) => (isActive ? "activeNavLink" : "");

    useEffect(() => {
        if (currentUser.isAdmin) {
            const response = axios
                .get(API_URL + "/admins/" + currentUser.id)
                .then((res) => setUserDetail(res?.data));
        } else {
            const response = axios
                .get(API_URL + "/users/" + currentUser.id)
                .then((res) => setUserDetail(res?.data));
        }
    }, []);

    return (
        <div className="container profilePageCont my-3">
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
                                element={
                                    <ProfileDetail
                                        userId={currentUser.id}
                                        userDetail={userDetail}
                                    />
                                }
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
