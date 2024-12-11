import * as yup from "yup";
 
export const validationSchema=yup.object({
    name:yup.string().required("Name is required"),
    username:yup.string().required("Username is required").min(5, "username must have atleast 5 character"),
    password:yup.string().required("PassWord is required").min(5,"Password must have atleast 5 character")
})