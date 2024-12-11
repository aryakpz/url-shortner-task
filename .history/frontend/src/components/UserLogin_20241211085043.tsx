import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth";

export const UserLogin: React.FC = () => {
    const [user, setUser] = useState<string | ''>('')
    const auth = useAuth()
    const nav = useNavigate()
    const initialValues = {
        username: "",
        password: "",
    };

    const addUser = useMutation({
        mutationFn: async (values: typeof initialValues) => {
            return (await (axios.post("http://localhost:5000/user/login", values))).data;
        },
        onSuccess: (data) => {
            nav("/home")
            console.log("rtgit5", data.data)
            sessionStorage.setItem("token", data.data.token)
            sessionStorage.setItem("username", data.data.username)
        },
        onError: () => { alert("Invalid usename or password") }
    });
                                                                        
    const onSubmit = (values: typeof initialValues) => {
        setUser(values.username)
        console.log(user)
        auth?.login(values.username)
        console.log(" enterd values:", values);
        addUser.mutate(values);
    };                                       
                                                             
    return (                             
        <div className="m-auto flex flex-col justify-center h-full w-full items-center font-lucida" >
            <h1 className="text-5xl p-5 font-black">Login</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}>
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
                                   



Typing  : [40wpm][91%]
Focus   : [09hr 23min][1315hr 46min]
CT      : [08hr 12min][114hr 26min]
ACT     : [07hr 36min][1084hr 13min]
HTML    : [0][15420]
CSS     : [0][24620]
JSON    : [0][14731]
JS      : [240][31331]
Total   : [240][86372]
days    : #32