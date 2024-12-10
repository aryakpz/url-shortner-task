import React from "react";
import axios from "axios";
import { DeleteProps } from "../type/types";
import { useMutation } from "@tanstack/react-query";

export const DeleteButton: React.FC<DeleteProps> = ({ shorturl }) => {
    const deletemethod = useMutation({
        mutationFn: async (shorturl: string) => {
            return axios.delete(`http://localhost:5000/api/delete/${shorturl}`);
        },
        onSuccess: () => {
            alert("Deleted successfully");
            refe
        }
    });
    const handleDelete = () => {
            deletemethod.mutate(shorturl);
    };

    return (
        <button
            onClick={handleDelete}
            className="bg-teal-950 text-white p-2 rounded-md px-5 hover:bg-teal-600 active:transform active:scale-95"
        >
            Delete
        </button>
    );
};
