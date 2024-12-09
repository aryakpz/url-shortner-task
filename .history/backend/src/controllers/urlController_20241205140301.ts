import db from "../database";
import { NextFunction, Request, Response } from "express";
import { addUrlToDb, deleteFromDb, findUrlFromDb, generateShortUrl, getUrlsFromDb, updateFromDb } from "../services/url.services";
import { constants } from "../constants";

// get all urls
export const getUrls = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const urls = await getUrlsFromDb();
        if (urls.length === 0) {
            return res.status(404).json({
                data:[],             
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
        const { url, length } = req.body;
        const shorturl = generateShortUrl(length);
        await addUrlToDb(url, length, shorturl);
        res.status(201).json({
            message: "Data added successfully",
            success: true,
            data: { url, shorturl },
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
      const response=  await deleteFromDb(shorturl)
        res.status(200).json({
            message: "Data deleted successfully",
            success: true,
            data: { shorturl }
        })
        console.log(789,response)
    } catch (error) {
        console.log(7890098765,error)

        next(error);
    }
}

// edit a url
export const editUrl = async (req: any, res: any, next: NextFunction) => {
    try {
        const { shorturl } = req.params;
        const { url } = req.body;
        console.log("new",url)
        const updated = await updateFromDb(url,shorturl)
        res.status(200).json({
            message: "url updated successfully",
            success: true,
            data: updated
        })
    } catch (error) {
        next(error)
    }
}

export const redirectUrl = async (req: any, res: any, next: NextFunction) => {
    try {
        const { shorturl } = req.params;
        const original = await findUrlFromDb(shorturl)
        res.redirect(original)
    } catch (error) {
        next(error)
    }
}



export const alterTable=async(req:Request,res:Response,next:NextFunction)=>{
    const alterQuery = `ALTER TABLE URLTABLE ADD COLUMN username varchar(3)`;
    db.run(alterQuery, (err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to alter table", error: err });
      }
      res.status(200).json({ message: "Table altered successfully" });
    });
    
}

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


