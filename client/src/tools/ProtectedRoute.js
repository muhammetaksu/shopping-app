import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ token }) => {
    if (!token) {
        return <Navigate to="/" replace />;
    } else {
        return <Outlet />;
    }
};
export default ProtectedRoute;
