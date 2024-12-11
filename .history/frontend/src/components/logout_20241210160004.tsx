import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth";

export const Logout: React.FC = () => {
    const nav = useNavigate()
    const auth = useAuth()
    const handleLogout = () => {
        sessionStorage.clear()
        auth?.logout()
        nav('/login', { replace: true })
    }
    return (
        <>
            <div className="p-3 hover:text-teal-950 hover:bg-white active:transform active:[scale:0.98] cursor-pointer" onClick={handleLogout}>Logout</div>
        </>
    )
}
     