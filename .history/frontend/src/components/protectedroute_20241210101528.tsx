import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

type ProtectedRouteProps = {
    children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const auth = useAuth();

    if (!auth?.user) {
        // Redirect to login page if user is not authenticated
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
