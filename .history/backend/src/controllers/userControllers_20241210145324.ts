import { Request, Response, NextFunction } from "express";
import { addUsersToDb, getSingleUser, getUserFromDb } from "../services/user.services";
import bcrypt from 'bcrypt';
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
        const users = await addUsersToDb(name, username, hashedPassword);
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
    return newPass;                   
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
        next(error);
    }
}

// login in to the home page
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    // console.log("Login user");
    try {
        const { username, password } = req.body;
        const user = await getSingleUser(username, password);
        // console.log(user,"user")
        res.status(200).json({
            message: "Logged in successfully.",
            success: true,
            data: { username: user.username, token: user.token },
        });
    } catch (error) {
        console.error("Error in loginUser:");        
        next(error);
    }
}
