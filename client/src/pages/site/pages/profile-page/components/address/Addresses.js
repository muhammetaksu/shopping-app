import React from "react";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import AddAddress from "./components/AddAddress";
import AddressList from "./components/AddressList";
import EditAddress from "./components/EditAddress";

const Addresses = ({ currentUser }) => {
    const activeLink = ({ isActive }) => (isActive ? "activeNavLink" : "");
    return (
        <div className="profileAddressCont">
            <div>
                <div className="profileAddressLinks">
                    <NavLink className={activeLink} to="list">
                        Address List
                    </NavLink>
                    <NavLink className={activeLink} to="add">
                        Add Address
                    </NavLink>
                </div>
                <div className="profileAddressRoutes">
                    <Routes>
                        <Route path="list" element={<AddressList currentUser={currentUser} />} />
                        <Route path="add" element={<AddAddress currentUser={currentUser} />} />

                        <Route path="edit" element={<EditAddress currentUser={currentUser} />} />
                        <Route path="" element={<Navigate to={"list"} />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Addresses;
