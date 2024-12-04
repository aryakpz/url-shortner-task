import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
export const UserLogin: React.FC = () => {
    const initialValues = {
        name: "",
        username: "",
        password: "",
    };

    //   const addUser=useMutation({
    //     mutationFn:async(values:typeof initialValues)=>{
    //         console.log(values)
    //         await axios.post("/user/post",values)
    //     }
    //   })
    //   const onSubmit =async (values: typeof initialValues) => {
    //     console.log("Form submitted:", values);
    //     addUser.mutate(values)
    //   };          

    const postUser = async (values:typeof initialValues) => {
        await axios.post("/user/post", values);
        console.log("User added successfully:", values);
        console.log("msdjvn ", values);
    }

    const addUser = useMutation({
        mutationFn: postUser
    });

    const onSubmit = async (values: typeof initialValues) => {
        console.log("Form submitted:", values.name);
        addUser.mutate(values); 
    };

    return (
        <div>
            <h1>Sign In</h1>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                <Form>
                    <div>
                        <label>Name</label>
                        <Field type="text" id="name" name="name" />
                        <ErrorMessage name="name" />
                    </div>
                    <div>
                        <label>Username</label>
                        <Field type="text" id="username" name="username" />
                        <ErrorMessage name="username" />
                    </div>
                    <div>
                        <label >Password</label>
                        <Field type="password" id="password" name="password" />
                        <ErrorMessage name="password" />
                    </div>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    );
};
