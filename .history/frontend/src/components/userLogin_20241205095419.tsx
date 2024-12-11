import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import * as Yup from "yup";
import { formProps } from "../type/types";

export const UserLogin: React.FC = () => {
    const initialValues = {
        name: "",
        username: "",
        password: "",
    };
   
        const validationSchema = Yup.object({
            name: Yup.string().required("Name is required"),
            username: Yup.string().required("Username is required"),
            password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        });
    
        const postUser = async (values: formProps) => {
            try {
                const response = await axios.post("http://localhost:5001/user/post", values);
                console.log("User added successfully:", response.data);
            } catch (error) {
                console.error("Error adding user:", error);
                if (axios.isAxiosError(error)) {
                    console.error("Axios error:", error.response?.data);
                    alert(`Error: ${error.response?.data.message || "Failed to add user"}`);
                }
            }
        };
    
        const addUser = useMutation({
            mutationFn: postUser,
        });
    
        const onSubmit = (values: in) => {
            console.log("Form submitted:", values);
            addUser.mutate(values);
        };
    
        return (
            <div>
                <h1>Sign In</h1>
                <Formik 
                    initialValues={initialValues} 
                    validationSchema={validationSchema} 
                    onSubmit={onSubmit}
                >
                    <Form>
                        <div>
                            <label>Name</label>
                            <Field name="name" type="text" />
                            <ErrorMessage name="name" component="div" />
                        </div>
    
                        <div>
                            <label>Username</label>
                            <Field name="username" type="text" />
                            <ErrorMessage name="username" component="div" />
                        </div>
    
                        <div>
                            <label>Password</label>
                            <Field name="password" type="password" />
                            <ErrorMessage name="password" component="div" />
                        </div>
    
                        <button type="submit">Submit</button>
                    </Form>
                </Formik>
            </div>
        );
    };
    