import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";

type ProtectedRouteProps = {
    children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const auth = useAuth();
    if (!auth?.user) {
        return <Navigate to="/" />;
    }
    return <>{children}</>;
};
export default ProtectedRoute;
