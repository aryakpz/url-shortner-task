// import db from "../database";
import { NextFunction, Request, Response } from "express";
import { addUrlToDb, deleteFromDb, findUrlFromDb, generateShortUrl, getCurrentUserUrl, getUrlsFromDb, updateFromDb } from "../services/url.services";
import { error } from "console";

// get all urls
export const getUrls = async (req: Request, res: Response, next: NextFunction) => {
    console.log("get urls")
    try {
        const urls = await getUrlsFromDb();
        if (urls.length === 0)
             {
            return res.status(404).json({
                data: [],
            });
        }
        res.status(200).json({              
            message: "Fetched successfully",
            success: true,
            data: urls ,
        });
    } catch (error) {
        next(error);
    }
};

//post a new url
export const postUrl = async (req: Request, res: Response, next: NextFunction) => {
    console.log("jdjnd")
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
    console.log("delete")
    try {
        const { shorturl } = req.params;
        const response = await deleteFromDb(shorturl)
        res.status(200).json({
            message: "Data deleted successfully",
            success: true,
            data: { response }
        })
    } catch (error) {
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

//get dashboard
export const getDashboard = async (req: any, res: any, next: NextFunction) => {

    try {
        const username=req.user.username
        // console.log("username",username)
        if(!username){
            return res.status(401).json({message:"User not found"})
        }
        const urls = await  getCurrentUserUrl(username);
        if(urls.length === 0)
            {
            return res.status(403).json({data:[]})
        }
        const newData=urls.map((item:any)=>({
            ...item.dataValues,link:`http://locahost:5000/${item.shorturl}`
        }))
       
        res.status(200).json({
            message: "Fetched successfully",
            success: true,
            data: newData ,
        });

    } catch (err) {
      next(error)
    }
};








 visual university of ;author higher educationsystem an arjun old next