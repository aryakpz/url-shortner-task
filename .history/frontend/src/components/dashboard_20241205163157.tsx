import React from "react";
import { NavBar } from "./navBar";
import { useQuery } from "@tanstack/react-query";
import { BackendResponse } from "../type/types";
import axios from "axios";

export const Dashboard: React.FC = () => {
    const username = sessionStorage.getItem("username")


    const { data } = useQuery({
        queryKey: ['users'],
        queryFn: async (): Promise<BackendResponse> => {
            const response = await axios.get(`/api/dashboard/${username}`);
            return response.data
        }
    })
cons
    console.log("dashboard", data)
    return (
        <div className="bg-black">
            <NavBar />
            <div>sdnisdkv ,sdv</div>
            <div className="max-w-full flex ">
                <table className="w-full m-10 border-2 border-black font-lucida" >
                    <thead>
                        <tr className="border-black border-2">
                            <th className="p-3">No:</th>
                            <th>Short URL</th>
                            <th>Main URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data &&
                            data.data.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        {item.id}
                                    </td>
                                    <td>
                                        {item.shorturl}
                                    </td>
                                    <td>
                                        {item.url}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

