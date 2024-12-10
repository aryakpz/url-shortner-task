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
//             const response = await axios.get(`/api/dashboard/${username}`,)
//             return response.data
//         }
//     })
//     console.log("dashboard", data?.data)
   

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
//                         {data?.data &&
//                             data.data.map((item) => (
//                                 <tr>
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

import React from "react";
import { NavBar } from "./navBar";
import { useQuery } from "@tanstack/react-query";
import { BackendResponse } from "../type/types";
import axios from "axios";

export const Dashboard: React.FC = () => {
  const username = sessionStorage.getItem("username");

  // React Query to fetch data
  const { data, isLoading, isError, error } = useQuery<BackendResponse>({
    queryKey: ["users", username],
    queryFn: async (): Promise<BackendResponse> => {
      if (!username) throw new Error("Username not found in session storage");
      const response = await axios.get(`/api/dashboard/${username}`);
      return response.data;
    },
  });

  console.log("Dashboard data:", data?.data);

  return (
    <div className="bg-black">
      <NavBar />
      <div>sdnisdkv ,sdv</div>
      <div className="max-w-full flex ">
        {isLoading ? (
          <p className="text-white">Loading...</p>
        ) : isError ? (
          <p className="text-red-500">Error: {error instanceof Error ? error.message : "Unknown error occurred"}</p>
        ) : (
          <table className="w-full m-10 border-2 border-black font-lucida">
            <thead>
              <tr className="border-black border-2">
                <th className="p-3">No:</th>
                <th>Short URL</th>
                <th>Main URL</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?  ? (
                data.data.map((item, index) => (
                  <tr key={index} className="border-black border-2">
                    <td className="p-3">{index + 1}</td>
                    <td>{item.shorturl}</td>
                    <td>{item.url}</td>
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
        )}
      </div>
    </div>
  );
};
