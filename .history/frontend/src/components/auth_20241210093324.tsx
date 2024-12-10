import { Children, createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider: React.FC = () => {
    const [user, setUser] = useState(null)
    const login = (user:) => {
        setUser(user)
    }
    const logout = () => {
        setUser(null)
    }
    return (

        <AuthProvider value={{ user, login, logout }}>
            {Children}
        </AuthProvider>
    )
}


export const useAuth=()=>{
    return useContext(AuthContext)
}