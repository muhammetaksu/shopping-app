import React from "react";
import { useNavigate } from "react-router-dom";

const PrimaryButton = ({ text, path }) => {
    const navigate = useNavigate();

    return (
        <button className="primaryButtonStyle" onClick={() => navigate(path)}>
            {text}
        </button>
    );
};

export default PrimaryButton;
