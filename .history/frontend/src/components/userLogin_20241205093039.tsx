// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";

// export const UserLogin: React.FC = () => {
//     const initialValues = {
//         name: "",
//         username: "",
//         password: "",
//     };

//   const postUser = async (values: typeof initialValues) => {
//     try {
//       const response = await axios.post("/user/post", values, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       console.log("User added successfully:", response.data);
//       return response.data;
//     } catch (error) {
//       console.error("Error adding user:", error);
//       throw new Error("Failed to add user");
//     }
//   };

//   const addUser = useMutation({
//     mutationFn: postUser,
//     onError: (error: any) => {
//       console.error("Error during mutation:", error);
//       if (axios.isAxiosError(error)) {
//         console.error("Error response:", error.response?.data);
//       }
//     },
//     onSuccess: (data) => {
//       console.log("Data after successful mutation:", data);
//     },
//   });

//   const onSubmit = (values: typeof initialValues) => {
//     console.log("Form submitted:", values);
//     addUser.mutate(values); 
//   };

//     return (
//         <div>
//             <h1>Sign In</h1>
//             <Formik initialValues={initialValues} onSubmit={onSubmit}>
//                 <Form>
//                     <div>
//                         <label>Name</label>
//                         <Field type="text" id="name" name="name" />
//                         <ErrorMessage name="name" />
//                     </div>
//                     <div>
//                         <label>Username</label>
//                         <Field type="text" id="username" name="username" />
//                         <ErrorMessage name="username" />
//                     </div>
//                     <div>
//                         <label >Password</label>
//                         <Field type="password" id="password" name="password" />
//                         <ErrorMessage name="password" />
//                     </div>
//                     <button type="submit">Submit</button>
//                 </Form>
//             </Formik>
//         </div>
//     );
// }
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import * as Yup from "yup";

// Type definition
export interface formProps {
    name: string;
    username: string;
    password: string;
}

export const UserLogin: React.FC = () => {
    const initialValues: formProps = {
        name: "",
        username: "",
        password: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        username: Yup.string().required("Username is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    });

    const postUser = async (req: Request, res: Response, next: NextFunction) => {
      try {
          console.log("Received data:", req.body);
          const { name, username, password } = req.body;
          if (!name || !username || !password) {
              return res.status(400).json({
                  message: "All fields are required",
                  success: false,
              });
          }
          const hashPassword = await hashingPassword(password);
          await addUsersToDb(name, username, hashPassword);
          res.status(201).json({
              message: "User added successfully",
              success: true,
              data: { name },
          });
      } catch (error) {
          console.error("Error in postUser:", error);
          res.status(500).json({
              message: "An error occurred on the server",
              success: false,
          });
      }
  };
  

    const addUser = useMutation({
        mutationFn: postUser,
        onSuccess: (data) => {
            console.log("User added successfully:", data);
            alert("User added successfully!");
        },
        onError: (error: any) => {
          if (axios.isAxiosError(error)) {
              console.error("Axios error:", error.response?.data);
              alert(`Error: ${error.response?.data.message || "Failed to add user"}`);
          } else {
              console.error("Unexpected error:", error);
              alert("An unexpected error occurred. Please try again.");
          }
      },
      
    });

    const onSubmit = (values: formProps) => {
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
                        <label htmlFor="name">Name</label>
                        <Field type="text" id="name" name="name" />
                        <ErrorMessage name="name" component="div" />
                    </div>
                    <div>
                        <label htmlFor="username">Username</label>
                        <Field type="text" id="username" name="username" />
                        <ErrorMessage name="username" component="div" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <Field type="password" id="password" name="password" />
                        <ErrorMessage name="password" component="div" />
                    </div>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    );
};
