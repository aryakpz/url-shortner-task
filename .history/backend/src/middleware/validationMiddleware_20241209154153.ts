import { AnyZodObject, z } from "zod";
import { Request, Response, NextFunction } from "express";

export const validationMiddleware = (res:Response,req:Request,next:NextFunction) =>{
    try{
        const user=req.body;
        if(!user){
            return res.status(401).json({message:"Both fields are required!"})
        }

        if(Iprocess)

    }catch(err){
        return res.status(401).json({message:"Something went wrong"})
    }
   
    };
