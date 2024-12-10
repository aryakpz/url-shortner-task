import { createContext, useState } from "react";

const AuthContext=createContext(null);

export const AuthProvider:React.FC=()=>{
    const  [user,setUser]=useState(null)
    const login =user =>{
        setUser(user)
    }
    const logout=()=>{
        
    }
    return(
        <></>

    )
}