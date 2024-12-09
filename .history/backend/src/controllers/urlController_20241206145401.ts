import db from "../database";
import { NextFunction, Request, Response } from "express";
import { addColumn, addUrlToDb, deleteFromDb, findUrlFromDb, generateShortUrl, getCurrentUserUrl, getUrlsFromDb, updateFromDb } from "../services/url.services";
import jwt from "jsonwebtoken"
import { getBuiltinModule } from "process";

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




//get dashboard===========

// export const getDashboard = async (req: Request, res: Response, next: NextFunction) => {

//     console.log("dash-backend", req.body.headers)
//     const authHeader = req.body.headers.Authorization;
//     console.log(authHeader)
//     if (!authHeader) {
//         console.log("auth-error")
//         return res.status(401).json({ messge: "User not authenticated" })
//     }
//     const token = authHeader.split(" ")[1]
// console.log(token,"token")
//     if (!process.env.JWT_KEY) {
//         console.log(344)
//         throw new Error("JWT_KEY is not defined in the environment variables");
//     }
//     try {
//         console.log(111, process.env.JWT_KEY)
//         const decode = jwt.verify(token, process.env.JWT_KEY) as { username: string };
//         console.log("Decoded Token:", decode);

//         console.log(9,decode)
//         console.log(333)
//         const urls = getCurrentUserUrl(decode.username)
//         res.status(200).json({
//             message: "fetched successfully",
//             success: true,
//             data: { urls }
//         })


//     } catch (err) {
//         console.log("SDvksj")
//         next(err)
//     }
// }

export const getDashboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // console.log(11, req.body.headers.Authorization);

        const authHeader = req.body.headers.Authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const token = authHeader.split(" ")[1];
        // console.log(2, token);

        if (!process.env.JWT_KEY) {
            throw new Error("JWT_KEY is not defined in environment variables.");

        }
        console.log("key", procesEY);

        const decode = jwt.verify(token, process.env.JWT_KEY) as { username: string };
        console.log("Decoded Token:", decode);

        const urls = getCurrentUserUrl(decode.username);
        // console.log("User URLs:", urls);

        res.status(200).json({
            message: "Fetched successfully",
            success: true,
            data: { urls },
        });
    } catch (err) {
        console.error("Error in getDashboard");
        res.status(401).json({ message: "Authentication failed" });
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