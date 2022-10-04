import { Navigate } from "react-router-dom";
const GuardRoute = ({ token, children }) => {
    if (!token) {
        return <Navigate to="/" replace />;
    }
    return children;
};
export default GuardRoute;
