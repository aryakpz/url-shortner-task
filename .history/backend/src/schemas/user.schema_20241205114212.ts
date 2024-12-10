import {z} from "zod";
export const userSchema=z.object({
    name:z.string(),
    username:z.string().min(5).max(10).u,
    password:z.string().min(5).max(10)
})
