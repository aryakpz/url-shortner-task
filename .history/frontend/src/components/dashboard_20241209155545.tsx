import React from "react";
import { NavBar } from "./navBar";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const Dashboard: React.FC = () => {
    const token = sessionStorage.getItem("token");
    const { data } = useQuery({
        queryKey: ['urls'],
        queryFn: async () => {
            const response = await axios.post("http://localhost:5000/api/dashboard", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            return response.data;
        }
    });
    
    console.log(data.data,"dashboras")
    return (
        <div className="bg-black text-white min-h-screen">
            <NavBar />
            <div className="max-w-full flex justify-center">
                <table className="w-full m-10 border-2 border-white font-lucida">
                    <thead>
                        <tr className="border-white border-2">
                            <th className="p-3  border-white">No:</th>
                            <th>Main URL</th>
                            <th className="border-white w-8">Short URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {token ?
                        (
                            
                        ) :}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
