import React from "react";
import { NavBar } from "./navBar";
import { useQuery } from "@tanstack/react-query";
import { BackendResponse } from "../type/types";

export const Dashboard:React.FC=()=>{
 
const {data}=useQuery({
    queryKey:['users'],
    queryFn:async():Promise<BackendResponse

})
  
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