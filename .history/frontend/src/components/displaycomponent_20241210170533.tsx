import React from "react";
import { NavBar } from "./navBar";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { DisplayData } from "./tableData";
import { urlProps } from "../type/types";

export const DisplayComponent: React.FC = () => {
    const token = sessionStorage.getItem("token")
    const { data } = useQuery({
        queryKey: ['urls'],
        queryFn: async () => {
            const response = await axios.post('http://localhost:5000/api/display', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            return response.data;
        }
    });             
    return (
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
                        {data?.data &&
                            data.data.map((item: urlProps, index: number) => (
                                <DisplayData item={item} index={index} key={index} />
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};