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


    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/dashboard/${username}`);
        console.log("Fetched data:", response.data);  // Check the structure of the response
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
      <div className="m-4 text-lg">Welcome to the Dashboard!</div>
      <div className="max-w-full flex justify-center">
        <table className="w-full m-10 border-2 border-white font-lucida">
          <thead>
            <tr className="border-white border-2">
              <th className="p-3">No:</th>
              <th>Short URL</th>
              <th>Main URL</th>
            </tr>
          </thead>
          <tbody>
            {urls.length > 0 ? (
            
              urls.map((item: any, index: number) => (
                <tr key={index} className="border-black border-2">
                <td className="border-black border-2 p-4 text-center w-2">
                    {index + 1}
                </td>
                <td className="border-black border-2 w-1/4 p-4 hover:text-teal-700">
                    <span
                        onClick={() =>
                            handleCopy(`${item.link}`)
                        }
                    >{item.link}
                    </span>
                </td>
                <td className="border-black border-2 p-4 hover:text-teal-700">
                    {change === item.shorturl ? (
                        <div className="flex">
                            <input
                                className="w-full pr-6  border-2 border-r-0 pl-1 focus:outline-none text-teal-950"
                                type="text"
                                value={newUrl}
                                onChange={(e) => setNewUrl(e.target.value)}
                            />
                            <button onClick={() => handleSave()} className="bg-teal-950 text-white p-2 rounded-md hover:bg-teal-600 actvie:transform active:[scale:0.98]">Save</button>
                        </div>
                    ) : (
                        item.url
                    )}
                </td>
                {/* <td>{item.username}</td> */}
                <td className="border-2 border-black  text-center w-7 px-8">
                    <button onClick={() => handleEdit(item.shorturl, item.url)} className="bg-teal-950 text-white p-2 rounded-md px-5 hover:bg-teal-600 actvie:transform active:[scale:0.98]">
                        Edit
                    </button>
                </td>
                <td className="text-center w-7 px-8"><DeleteButton shorturl={item.shorturl} /></td>
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
