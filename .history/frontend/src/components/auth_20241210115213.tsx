import { createContext, ReactNode, useContext, useState } from "react";

type AuthContextProp = {
    user: string | null,
    login: (user: string) => void,
    logout: () => void
}
type AuthproviderProp = {
    children: ReactNode
}
const AuthContext = createContext<AuthContextProp | null>(null);

export const AuthProvider: React.FC<AuthproviderProp> = ({ children }) => {
    const [user, setUser] = useState<string | null>(null)
    const login = (user: string) => {
        setUser(user)
    }
    const logout = () => {
        setUser(null)
    }
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}

is thiis 