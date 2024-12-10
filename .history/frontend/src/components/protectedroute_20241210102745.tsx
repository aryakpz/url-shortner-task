import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";

type ProtectedRouteProps = {
    children: React.ReactNode;
};

epoconst ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const auth = useAuth();
    if (!auth?.user) {
        return <Navigate to="/" />;
    }
    return <>{children}</>;
};

