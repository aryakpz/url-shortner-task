import {z} from "zod";
export const userSchema=z.object({
    name:z.string(),
    usename:z.string().min(5).max(10),
    password:z.string().min(5).max(10)
})
export const userAuthSchema = z.object({
    username: z.string().min(5, "Username must be at least 5 characters").max(15, "Username must be at most 15 characters"),
    password: z.string().min(5, "Password must be at least 5 characters").max(15, "Password must be at most 15 characters"),
  });
  