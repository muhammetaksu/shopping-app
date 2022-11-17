import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const AdminOnlyRoute = ({ children }) => {
    const { currentUser } = useSelector((state) => state.userReducer);

    if (currentUser?.isAdmin === true) {
        return <Outlet />;
    }
    return <Navigate to="/" />;
};

export const AdminOnlyLink = ({ children }) => {
    const { currentUser } = useSelector((state) => state.userReducer);

    if (currentUser?.isAdmin === true) {
        return children;
    }
    return null;
};
