import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const { isLoggedIn, isAdmin } = useSelector(state => state.auth);
    return !isLoggedIn ? <Navigate to="/login" /> : isAdmin ? children : <Navigate to="/restricted" />;
};

export default AdminRoute;