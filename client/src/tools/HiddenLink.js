import { useSelector } from "react-redux";

export const ShowOnLogin = ({ children }) => {
    const { currentUser } = useSelector((state) => state.userReducer);

    if (currentUser?.token) {
        return children;
    }
    return null;
};

export const ShowOnLogout = ({ children }) => {
    const { currentUser } = useSelector((state) => state.userReducer);

    if (!currentUser?.token) {
        return children;
    }
    return null;
};
