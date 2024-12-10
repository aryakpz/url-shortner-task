import {  createContext, ReactNode, useContext, useState } from "react";
 
type AuthContextProp={
    user:string |null,
    login:(user:string)=>void,
    logout:()=>void
}

type AuthproviderProp={
    children:ReactNode
}
const AuthContext = createContext<AuthContextProp | null>(null);

export const AuthProvider: React.FC<AuthproviderProp> = ({Children}) => {
    const [user, setUser] = useState<string |null>(null)
    const login = (user:string) => {
        setUser(user)chi
    }
    const logout = () => {
        setUser(null)
    }
    return (

        <AuthContext.Provider value={{ user, login, logout }}>
        {}
        </AuthContext.Provider>
    )
}


export const useAuth=()=>{
    return useContext(AuthContext)
}