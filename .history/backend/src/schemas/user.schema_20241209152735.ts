import {z} from "zod";
export const userSchema=z.object({
    name:z.string(),
    usename:z.string().min(5).max(10),
    password:z.string().min(5).max(10)
})

exp