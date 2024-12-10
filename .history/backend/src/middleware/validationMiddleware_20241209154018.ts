import { AnyZodObject, z } from "zod";
import { Request, Response, NextFunction } from "express";

export const validationMiddleware = (res:Response,req:Request,next:NextFunction) =>{
    try{
        cosnt 

    }catch(err){
        return res.status(401).json({message:"Something went wrong"})
    }
   
    };
