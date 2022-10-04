import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const AdminOnlyRoute = ({ children }) => {
    const currentUser = useSelector((state) => state.userReducer);

    if (currentUser?.isAdmin === true) {
        return children;
    } else {
        return (
            <section style={{ height: "80vh" }}>
                <div className="container">
                    <h2>Permission Denied!</h2>
                    <p>This page can only be viewed by admin! </p>
                    <br />
                    <Link to="/">
                        <button className="--btn">Back To Home Page</button>
                    </Link>
                </div>
            </section>
        );
    }
};

export const AdminOnlyLink = ({ children }) => {
    const { currentUser } = useSelector((state) => state.userReducer);

    if (currentUser?.isAdmin === true) {
        return children;
    }
    return null;
};
