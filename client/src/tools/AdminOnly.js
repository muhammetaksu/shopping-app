import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const AdminOnlyRoute = ({ children }) => {
    const { currentUser } = useSelector((state) => state.userReducer);

    if (currentUser?.isAdmin === true) {
        return children;
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
