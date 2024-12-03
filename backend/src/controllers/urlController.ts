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








// export const getUrls = async (req: Request, res: Response,next:NextFunction) => {

// try {
//     db.all('SELECT * FROM URLTABLE', [], (err, rows) => {
//         if (err) {
//             res.status(constants.SERVER_ERROR);
//             throw new Error("Server error")
//         }
//         res.status(200).json(rows);
//     });
// } catch (error) {
//     next(error)
// }};

// post new url 

// export const postUrl = asyncHandler(async (req: any, res: any, next: NextFunction) => {
//     try {
//         const { url, length } = req.body;
//         if (!url || typeof length !== 'number') {
//             res.status(constants.VALIDATION_ERROR)
//             throw new Error("invalid input")
//         }
//         const shorturl = generateUrl(length)

//         const insertQuery = 'INSERT INTO URLTABLE (url,length,shorturl) VALUES (?,?,?)';
//         db.run(insertQuery, [url, length, shorturl], function (err) {
//             if (err) {
//                 console.log(err.message)
//                 res.status(constants.SERVER_ERROR)
//                 throw new Error('Error occurred during database insertion');

//             }
//             res.status(201).json({ message: "Data added successfully" })
//         })
//     } catch (error) {
//         next(error)
//     }

// })



// generating the short key for each url
// const generateUrl = (length: number) => {
//     const character = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let result = '';
//     for (let i = 0; i < length; i++) {
//         const short = Math.floor(Math.random() * character.length);
//         result += character[short];
//     }
//     return result;
// }



//delete the url from  the database
// export const deleteUrl = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

//     try {
//         const { shorturl } = req.params;
//         console.log(23432, req.params)

//         const deleteQuery = "DELETE FROM URLTABLE WHERE shorturl=?";
//         db.run(deleteQuery, [shorturl], function (err) {

//             if (err) {
//                 console.error("Database error:", err.message);
//                 res.status(constants.SERVER_ERROR);
//                 throw new Error("Error during deletion")
//             }

//             res.status(200).json({ message: `Short URL '${shorturl}' deleted successfully.` });

//         });
//     } catch (error) {
//         next(error);
//     }
// })


// update the url
// export const editUrl = asyncHandler(async (req: any, res: any, next: NextFunction) => {

//     try {
//         const { shorturl } = req.params;
//         const { newurl } = req.body
//         if (!newurl) {
//             res.status(constants.VALIDATION_ERROR);
//             throw new Error("Please enter a new url")
//         }
//         const updateQuery = "UPDATE URL_TABLE SET url= ? WHERE shorturl=?"
//         db.run(updateQuery, [newurl, shorturl], function (err) {
//             if (err) {
//                 console.error("error updating database:", err.message);
//                 res.status(constants.SERVER_ERROR)
//                 throw new Error("Internal server error")
//             }

//             res.status(200).json({ message: `url updated successfully ` })
//         })
//     } catch (error) {
//         next(error)
//     }
// })

// short url redirect into the main url 
// export const redirectUrl = asyncHandler(async (req: any, res: any, next: NextFunction) => {
//     try {
//         const { shorturl } = req.params;
//         const findQuery = "SELECT url FROM URLTABLE WHERE shorturl = ?";
//         db.get(findQuery, [shorturl], (err, row: { url: string } | undefined) => {
//             if (err) {
//                 console.error("Error querying database:", err.message);
//                 res.status(constants.VALIDATION_ERROR)
//                 throw new Error("internal server error")
//             }
//             if (!row || !row.url) {
//                 res.status(constants.NOT_FOUND)
//                 throw new Error("url not found")
//             }
//             const originalUrl = row.url;
//             res.redirect(originalUrl);
//         })
//     } catch (error) {
//         next(error)
//     }
// })


// create the table 
export const createTable =async (req: any, res: any, next: NextFunction) => {
    try {
        const createQuery = `
    CREATE TABLE IF NOT EXISTS URLTABLE (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL,
    length INTEGER NOT NULL,   
    shorturl TEXT NOT NULL UNIQUE)
    `;
        db.run(createQuery, (err: { message: any }) => {
            if (err) {
                console.error('Error creating table: ', err.message);
                res.status(constants.SERVER_ERROR);
                throw new Error("Error occured on creating a table")
            }
            res.send('Table created successfully');
        });
    } catch (error) {
        next(error)
    }
}




