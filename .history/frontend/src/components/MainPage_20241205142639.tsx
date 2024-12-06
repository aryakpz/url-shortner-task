import React, { useState } from "react";
import { NavBar } from "./navBar";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { postProps } from "../type/types";

export const MainPage: React.FC = () => {
    const [length, setLength] = useState<number>(0);
    const [url, setUrl] = useState<string>("");
    // input box event change function
    const username = sessionStorage.getItem("username")
    const token = sessionStorage.getItem("token")
console.log(1,usr)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const value = e.target.value;
        if (id === "url") {
            setUrl(value);
        } else if (id === "length") {
            const inputLength = Number(value);
            if (!isNaN(inputLength)) {
                setLength(inputLength);
            }
        }
    };
    // post mutation
    const posturl = async (newurl: postProps) => {
        await axios.post("/api/add", newurl)
    }
    const addurl = useMutation({
        mutationFn: posturl
    })
    const handleClick = async () => {
        const datasec = { url, length, username };
        addurl.mutate(datasec)
        setUrl("");
        setLength(0);
    };

    return (
        <>
            <NavBar />
            <div className=" flex flex-col mx-auto mt-20 justify-center h-full w-full items-center font-lucida">
                <h2 className="text-3xl mb-10 font-black ">Short URL</h2>
                <div className="flex flex-col shadow-2xl p-14 w-max">
                    <div className="p-5 ">
                        <input
                            type="text"
                            className="border-b-2 p-2 text-black-20 focus:outline-none hover:bg-teal-50 text-2xl"
                            placeholder="Enter the link here"
                            value={url}
                            onChange={(e) => handleChange(e, "url")
                            }
                        />
                    </div>
                    <div className="p-5 text-lg">
                        <input
                            type="number"
                            className="border-b-2 p-2 text-black-20 focus:outline-none hover:bg-teal-50 text-2xl"
                            value={length || ''}
                            placeholder="Enter the Length here "
                            max="23"
                            onChange={(e) => handleChange(e, "length")}
                        />
                    </div>
                    <div className="items-center mx-auto mt-7">
                        <button onClick={handleClick} className="bg-teal-800 text-white cursor-pointer rounded-md p-3 
                           hover:bg-teal-50 hover:border-2 border-teal-800 hover:text-teal-800 text-xl font-black active:transform">
                            Generate URL</button>
                    </div>
                </div>
            </div>
        </>
    );
};
