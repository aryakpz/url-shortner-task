import React from "react";
import { NavLink } from "react-router-dom";
import { Logout } from "./logout";
import { useAuth } from "./auth";

export const NavBar: React.FC = () => {

    const auth=useAuth
    return (
        <div className="w-full bg-teal-950 p-3">
            <nav className="flex max-w-8xl justify-between font-lucida font-bold text-white text-lg ">
                <div>
                    <Logout/> 
                </div>
                <div>
                    <NavLink to={'/home'} className="p-3 hover:text-teal-950 hover:bg-white active:transform active:[scale:0.98]">Home</NavLink>
                    <NavLink to={'/display'} className="p-3  hover:text-teal-950 hover:bg-white active:transform active:[scale:0.98]">Show URL</NavLink>
                    <NavLink to={'/dashboard'} className="p-3  hover:text-teal-950 hover:bg-white active:transform active:[scale:0.98]">Dashboard</NavLink>
                </div>
            </nav>
        </div>
    )
}
