import db from "../database";
import { NextFunction, Request, Response } from "express";
import { addColumn, addUrlToDb, deleteFromDb, findUrlFromDb, generateShortUrl, getCurrentUserUrl, getUrlsFromDb, updateFromDb } from "../services/url.services";
import jwt from "jsonwebtoken"

// get all urls
export const getUrls = async (req: Request, res: Response, next: NextFunction) => {
    console.log("get urls")
    try {
        const urls = await getUrlsFromDb();
        if (urls.length === 0) {
            return res.status(404).json({
                data: [],
            });
        }
        return res.status(200).json({
            data: urls,
        });
    } catch (error) {
        next(error);
    }
    console.log(db)
};

//post a new url
export const postUrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { url, length, username } = req.body;
        console.log("backend", username)
        const shorturl = generateShortUrl(length);
        await addUrlToDb(url, length, shorturl, username);
        res.status(201).json({
            message: "Data added successfully",
            success: true,
            data: { url, shorturl, username },
        });
    } catch (error) {
        next(error);
    }
};

//delete a  url
export const deleteUrl = async (req: Request, res: Response, next: NextFunction) => {
    console.log(890)
    try {
        const { shorturl } = req.params;
        const response = await deleteFromDb(shorturl)
        res.status(200).json({
            message: "Data deleted successfully",
            success: true,
            data: { shorturl }
        })
        console.log(789, response)
    } catch (error) {
        console.log(7890098765, error)

        next(error);
    }
}

// edit a url
export const editUrl = async (req: any, res: any, next: NextFunction) => {
    try {
        const { shorturl } = req.params;
        const { url } = req.body;
        console.log("new", url)
        const updated = await updateFromDb(url, shorturl)
        res.status(200).json({
            message: "url updated successfully",
            success: true,
            data: updated
        })
    } catch (error) {
        next(error)
    }
}

//rediredct the link
export const redirectUrl = async (req: any, res: any, next: NextFunction) => {
    try {
        const { shorturl } = req.params;
        const original = await findUrlFromDb(shorturl)
        res.redirect(original)
    } catch (error) {
        next(error)
    }
}

//alter table-add new column
export const alterTable = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await addColumn()
        res.status(201).json({
            message: "Tabel alterd successfully",
            success: true,
        })
    }
    catch (error) {
        next(error)
    }
}

export const getDashboard = async (req: Request, res: Response, next: NextFunction) => {
    console.log("dash-backend",req.headers.Authorization)
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        console.log("autherror")
        return res.status(401).json({ messge: "User not authenticated" })
    }
    const token = authHeader.split(" ")[1]
    try {
        // Check if JWT_KEY is defined
        if (!process.env.JWT_KEY) {
            throw new Error("JWT_KEY is not defined in the environment variables");
        }
        const decode = jwt.verify(token, process.env.JWT_KEY)as{username:string}
        const urls=getCurrentUserUrl(decode.username)
        res.status(200).json({
            message:"fetched successfully",
            success:true,
            data:{urls}
        })
    } catch (err) {
        next(err)
    }
}
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getCurrentUserUrl } from '../services/url.services';  // Ensure this function is correctly implemented

export const getDashboard = async (req: Request, res: Response, next: NextFunction) => {
    console.log("dash-backend", req.headers.authorization);  // Log authorization header for debugging
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        console.log("autherror");
        return res.status(401).json({ message: "User not authenticated" });
    }

    const token = authHeader.split(" ")[1];  // Extract token from 'Bearer <token>'
    
    try {
        // Check if JWT_KEY is defined in environment variables
        if (!process.env.JWT_KEY) {
            throw new Error("JWT_KEY is not defined in the environment variables");
        }

        // Verify the token
        const decode = jwt.verify(token, process.env.JWT_KEY) as { username: string };
        
        // Ensure decode object contains username
        if (!decode.username) {
            throw new Error("Invalid token: Missing username");
        }

        // Fetch URLs for the authenticated user
        const urls = await getCurrentUserUrl(decode.username);

        // Send response with fetched URLs
        res.status(200).json({
            message: "Fetched successfully",
            success: true,
            data: { urls }
        });

    } catch (err) {
        console.error("Error during dashboard fetch:", err);  // Log error for better debugging
        next(err);  // Pass the error to the error handling middleware
    }
};


// create the table 
// export const createTable =async (req: any, res: any, next: NextFunction) => {
//     try {
//         const createQuery = `
//     CREATE TABLE IF NOT EXISTS URLTABLE (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     url TEXT NOT NULL,
//     length INTEGER NOT NULL,   
//     shorturl TEXT NOT NULL UNIQUE)
//     `;
//         db.run(createQuery, (err: { message: any }) => {
//             if (err) {
//                 console.error('Error creating table: ', err.message);
//                 res.status(constants.SERVER_ERROR);
//                 throw new Error("Error occured on creating a table")
//             }
//             res.send('Table created successfully');
//         });
//     } catch (error) {
//         next(error)
//     }
// }