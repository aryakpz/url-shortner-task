import React from "react";

export const Dashboard:React.FC=()=>{
    return(
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
                        data.data.map((item, index) => (
                            <DisplayData item={item} index={index}/>
                        ))}
                </tbody>
            </table>
        </div>
    </>
    )
}