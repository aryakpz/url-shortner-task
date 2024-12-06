import React from "react";
import { NavLink } from "react-router-dom";

export const NavBar:React.FC=()=>{
return(
    <div className="w-full bg-teal-950">
        <nav className="flex max-w-8xl justify-end font-lucida font-bold text-white text-lg ">
            <div>
            <NavLink to={'/'} className="p-3 hover:text-teal-950 hover:bg-white active:transform active:[scale:0.98]" >Login</NavLink>
            </div>
        </nav>
    </div>
)}