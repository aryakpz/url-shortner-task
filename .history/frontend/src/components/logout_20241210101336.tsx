import React from "react";
import { useNavigate } from "react-router-dom";

export const Logout:React.FC=()=>{
    const nav=useNavigate()
    const auth=
    const handleLogout=()=>{
        sessionStorage.clear()
        nav('/login' ,{replace:true})
        auht
    }
    return(
        <>
        <div className="p-3 hover:text-teal-950 hover:bg-white active:transform active:[scale:0.98] cursor-pointer" onClick={handleLogout}>Logout</div>
        </>
    )
}


