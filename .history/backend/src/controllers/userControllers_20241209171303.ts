
import { Request, Response, NextFunction } from "express";
import { addUsersToDb, getSingleUser, getUserFromDb } from "../services/user.services";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

//add new user
export const postUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    try {
        const { name, username, password } = req.body;
        if (!name || !username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const hashedPassword = await hashingPassword(password);
        const users= await addUsersToDb(name, username, hashedPassword);
        res.status(201).json({
            message: "User added successfully",
            success: true,
            data: { users }
        });
    } catch (error) {
        next(error);
    }
};

//hashing password function
async function hashingPassword(password: string): Promise<string> {
    const newPass = await bcrypt.hash(password, 8)
    return newPass
}

//get all the users
export const getUser = async (req: any, res: any, next: NextFunction) => {
    try {
        const data = await getUserFromDb()
        res.status(201).json({
            message: "Fetch all users",
            success: true,
            data: { data }
        })
    } catch (error) {
        next(error)
    }
}

// login in to the home page
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Login endpoint hit");

    try {
        const { username, password } = req.body;
        // Fetch user by username
        const user = await getSingleUser(username);
        // if (!user) {
        //     return res.status(404).json({ message: "User not found." });
        // }
        // // Compare password
        // const passwordCheck = await bcrypt.compare(password, user.password);
        // if (!passwordCheck) {
        //     return res.status(401).json({ message: "Invalid password." });
        // }
        // // Check the key is in the env
        // if (!process.env.JWT_KEY) {
        //     throw new Error("key is nor in the env.");
        // }
        // // Generate token 
        // const token = jwt.sign({ 
        //     user:{
        //         username:user.usename,
        //         id:user.id
        //     }
        // }, process.env.JWT_KEY, {
        //     expiresIn: "1h",
        // });
        

        console.log(user.usename,"user")
        res.status(200).json({           
            message: "Logged in successfully.",
            success: true,
            data: { username: user.usename, token },
        });
    } catch (error) {
        console.error("Error in loginUser:");
        next(error);
    }
}


