import React from "react";
import { NavBar } from "./navBar";

export const Dashboard:React.FC=()=>{
 
    cons
  
    return(
        <>
        <NavBar />
        <div className="max-w-full flex ">
            <table className="w-full m-10 border-2 border-black font-lucida" >
                <thead>
                    <tr className="border-black border-2">
                        <th className="p-3">No:</th>
                        <th>Short URL</th>
                        <th>Main URL</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                   
                </tbody>
            </table>
        </div>
    </>
    )
}