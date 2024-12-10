import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { validationSchema } from "../schema/validationSchema";

export const UserLogin: React.FC = () => {
  const initialValues = {
    name: "",
    username: "",
    password: "",
  };

  const postUser = async (values: typeof initialValues) => {
    await axios.post("http://localhost:5001/user/post", values);
    console.log("User added successfully:")
  };

  const addUser = useMutation({
    mutationFn: postUser,
  });

  const onSubmit = (values: typeof initialValues) => {
    console.log("Form submitted:", values);
    addUser.mutate(values);
  };

  return (
    <div className="m-auto flex flex-col justify-center h-full w-full items-center" >
      <h1 className="text-2xl p-5 ">Sign In</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="w-full max-w bg-black text-white p-10  text-xl">
          <div className="flex p-3 jutify-between">
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
