import { Children, createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider: React.FC = () => {
    const [user, setUser] = useState<string |null>(null)
    const login = (user:string) => {
        setUser(user)
    }
    const logout = () => {
        setUser(null)
    }
    return (

        <AuthContext.P value={{ user, login, logout }}>
            {Children}
        </AuthContext.P>
    )
}


export const useAuth=()=>{
    return useContext(AuthContext)
}