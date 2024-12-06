import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
// import { validationSchema } from "../schema/validationSchema";
import { useNavigate } from "react-router-dom";

export const UserLogin: React.FC = () => {
    const nav = useNavigate()
    const initialValues = {
        username: "",
        password: "",
    };

    const postUser = async (values: typeof initialValues) => {
        try {
            const response = await axios.post("http://localhost:5001/user/login", values);
            console.log(response.data)
            sessionStorage.setItem("token",response.data.token)
            nav("/home")
        }
        catch (err) {
            alert(" Invalid username Or password")
        }
    };

    var x=s
    const addUser = useMutation({
        mutationFn: postUser,
    });

    const onSubmit = (values: typeof initialValues) => {
        console.log("Form submitted:", values);
        addUser.mutate(values);
    };

    return (
        <div className="m-auto flex flex-col justify-center h-full w-full items-center font-lucida" >
            <h1 className="text-5xl p-5 font-black">Login </h1>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                <Form className="w-full max-w-xl bg-black text-white p-10  text-2xl rounded-md shadow-2xl">

                    <div className="flex p-3 justify-between">
                        <label>Username</label>
                        <Field name="username" type="text" className="h-10 text-black" />
                        <ErrorMessage name="username" component="div" className="text-sm" />
                    </div>

                    <div className="flex p-3 justify-between">
                        <label>Password</label>
                        <Field name="password" type="password" className="h-10 text-black" />
                        <ErrorMessage name="password" component="div" className="text-sm" />
                    </div>

                    <div className=" flex justify-center">
                        <button type="submit" className=" bg-white text-black font-bold p-3 rounded-lg mt-8 w-60 hover:bg-slate-400 active:transform active:[scale 0.98]">
                            Login
                        </button>
                    </div>

                </Form>
            </Formik>
            <div className="w-full max-w-xl ">
                <p className="p-2 hover:text-blue-600 cursor-pointer" onClick={() => nav('/')}>SignIn</p>
            </div>
        </div>
    );
};
