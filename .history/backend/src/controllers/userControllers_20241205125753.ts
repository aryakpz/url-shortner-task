import { constants } from "../constants";
import { Request, Response, NextFunction } from "express";
import db from "../database";
import { addUsersToDb, getSingleUser, getUserFromDb, UserLogin } from "../services/user.services";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const create = async (req: any, res: any, next: NextFunction) => {
    try {
        const createUser = `
            CREATE TABLE IF NOT EXISTS USERTABLE (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                username TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            )`;

        db.run(createUser, (err: { message: any }) => {
            if (err) {
                console.error("Error creating table:", err.message);
                res.status(constants.SERVER_ERROR).json({ message: "Error creating table", success: false });
            }
            res.send('Table created successfully');
        });
    } catch (error) {
        console.error("Error in create function:", error);
        next(error);
    }
};


export const postUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, username, password } = req.body;
        if (!name || !username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const hashedPassword = await hashingPassword(password);
        await addUsersToDb(name, username, hashedPassword);
        res.status(201).json({
            message: "User added successfully",
            success: true,
            data: { name }
        });
    } catch (error) {
        next(error);
    }
};

async function hashingPassword(password: string): Promise<string> {
    const newPass = await bcrypt.hash(password, 8)
    return newPass
}

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

export const loginUser = async (req: any, res: any, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const user = await getSingleUser(username);
        console.log(user, 55)

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
       
        const passwordCheck = await bcrypt.compare(password, user.password);

        if (!passwordCheck) {
            return res.status(200).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ username: user.username }, "your secret key", {
            expiresIn: "1h"
        });

        res.status(200).json({
            message: "Logged in successfully",
            success: true,
            data: { username: user.username, token: token }
        });

    } catch (error) {
        next(error);
    }
};
