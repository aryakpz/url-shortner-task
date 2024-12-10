import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { DeleteButton } from "./deleteApi";
import { editPros } from "../type/types";

export const DisplayData: React.FC<editPros> = ({ item, index }) => {
    const [newUrl, setNewUrl] = useState<string>("");
    const [change, setChange] = useState<string | >("")


    //url copy on clipboard
    const handleCopy = (url: string) => {
        navigator.clipboard.writeText(url).then(() => {
            alert("URL copied to clipboard!");
        }).catch((err) => {
            console.error("Failed to copy: ", err);
        });
    };

    // URL editing function
    const handleEdit = (shortUrl: string, currentUrl: string) => {
        setChange(shortUrl)
        setNewUrl(currentUrl);

    };

    const editmethod = useMutation({
        mutationFn: async (newUrl: string) => {
            await axios.put(`http://localhost:5000/api/edit/${}`, { url: newUrl })
            window.location.reload()
        }
    })

    // Save the edited URL 
    const handleSave = async () => {
        console.log(newUrl)
        editmethod.mutate(newUrl)
    };
    return (
        <>
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
        </>
    )
}   