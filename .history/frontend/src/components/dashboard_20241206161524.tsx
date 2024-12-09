import React from "react";
import { NavBar } from "./navBar";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const Dashboard: React.FC = () => {
    const token = sessionStorage.getItem("token");

    console.log("dash-",token)
    const { data, isLoading, error } = useQuery({
        queryKey: ['urls'],
        queryFn: async () => {
            const response = await axios.post("http://localhost:5000/api/dashboard", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            console.log(99,data)
            return response.data;
        }
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error instanceof Error) {
        return <div>Error: {error.message}</div>;
    }

    console.log(666,data.data)
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
                        {data && 
                            data?.data.map((item: any, index: number) => (
                                <tr key={index} className="border-white border-2 justify-between cursor-pointer">
                                    <td className="border-2 p-4 text-center w-2">
                                        {item.id}
                                    </td>
                                    <td className="border-2 text-center w-7 px-8">
                                        {item.url}s
                                    </td>
                                    <td className="border-2 p-4 hover:text-teal-700">
                                        {item.shortUr}
                                    </td>
                                </tr>
                            ))
                      }
                    </tbody>
                </table>
            </div>
        </div>
    );
};
