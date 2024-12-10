import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";


export const ProtectedRoute: React.FC = ( }) => {
    const auth = useAuth();
    if (!auth?.user) {
        return <Navigate to="/" />;
    }
    return <>{children}</>;
};

