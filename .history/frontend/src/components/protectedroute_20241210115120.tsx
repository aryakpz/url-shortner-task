import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";

type ProtectedRouteProps = {
    children: React.ReactNode;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const auth = useAuth();
    if (!auth?.user) {
        return <Navigate to="/l" />;
    }
    return <>{children}</>;
};

