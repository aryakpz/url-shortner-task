import React from "react";
import { useNavigate } from "react-router-dom";

export const Logout:React.FC=()=>{
    const handleLogout=()=>{
        sessionStorage.clear()
        
    }
    return(
        <>
        <div className="p-3 hover:text-teal-950 hover:bg-white active:transform active:[scale:0.98]" onClick={handleLogout}>Logout</div>
        </>
    )
}