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

    const postUser = async (values: typeof initialValues) => {
        try {
          // Make the POST request to the backend
          const response = await axios.post("/user/post", values);
          console.log("User added successfully:", response.data);
        } catch (error) {
          // Handle any error that occurs during the request
          console.error("Error adding user:", error);
          throw new Error("Failed to add user");
        }
      };
      
      const addUser = useMutation({
        mutationFn: postUser,
        onError: (error) => {
          console.log("Error during mutation:", error);
        },
        onSuccess: (data) => {
          console.log("Data after successful mutation:", data);
        },
      });
      
      const onSubmit = async (values: typeof initialValues) => {
        console.log("Form submitted:", values);
        addUser.mutate(values);  // Trigger mutation
      };        

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
