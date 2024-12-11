// import React from "react";
// import { NavBar } from "./navBar";
// import { useQuery } from "@tanstack/react-query";
// import { BackendResponse } from "../type/types";
// import axios from "axios";

// export const Dashboard: React.FC = () => {
//     const username = sessionStorage.getItem("username")


//     const { data } = useQuery({
//         queryKey: ['users'],
//         queryFn: async (): Promise<BackendResponse> => {
//             const response = await axios.get(`/api/dashboard/${username}`);
//             return response.data
//         }
//     })



//     console.log("dashboard", data)
//     return (
//         <div className="bg-black">
//             <NavBar />
//             <div>sdnisdkv ,sdv</div>
//             <div className="max-w-full flex ">
//                 <table className="w-full m-10 border-2 border-black font-lucida" >
//                     <thead>
//                         <tr className="border-black border-2">
//                             <th className="p-3">No:</th>
//                             <th>Short URL</th>
//                             <th>Main URL</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {data?.data&&
//                             data.data.map((item, index) => (
//                                 <tr key={index}>
//                                     <td>
//                                         {item.id}
//                                     </td>
//                                     <td>
//                                         {item.shorturl}
//                                     </td>
//                                     <td>
//                                         {item.url}
//                                     </td>
//                                 </tr>
//                             ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     )
// }

import React, { useState, useEffect } from "react";
import { NavBar } from "./navBar";
import axios from "axios";

export const Dashboard: React.FC = () => {
    const username = sessionStorage.getItem("username");
    const [data, setData] = useState<any>(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/dashboard/${username}`);
                console.log("Fetched data:", response.data);  
                setData(response.data);
            } catch (err) {

            }
        };

        fetchData();
    }, [username]);


    // Check the structure of the data returned
    const urls = data?.data?.urls || []; // Assuming 'data' contains 'data' with 'urls' array

    return (
        <div className="bg-black text-white min-h-screen">
            <NavBar />
            <div className="max-w-full flex justify-center">
                <table className="w-full m-10 border-2 border-white font-lucida">
                    <thead>
                        <tr className="border-white border-2">
                            <th className="p-3  border-white" >No:</th>
                            
                            <th>Main URL</th>
                            <th className="border-white w-8">Short URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {urls.length > 0 ? (

                            urls.map((item: any, index: number) => (
                                <tr key={index} className="border-white border-2 justify-between  cursor-pointer">
                                    <td className="border-2 p-4 text-center w-2">
                                        {index + 1}
                                    </td>
                                    <td className="border-2  text-center w-7 px-8">
                                        {item.url}
                                    </td>
                                    <td className="border-2 p-4 hover:text-teal-700">
                                        {item.shorturl}
                                    </td>
                                    
                                </tr>
                            ))
                        ) : (

                            <tr>
                                <td colSpan={3} className="text-center p-3">
                                    No URLs found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
