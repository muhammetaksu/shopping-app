import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function ProfilePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.userReducer);

    return <div className="container ">PROFILE PAGE</div>;
}

export default ProfilePage;
