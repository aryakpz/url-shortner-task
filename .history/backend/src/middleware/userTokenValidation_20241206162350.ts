import jwt from "jsonwebtoken";
import { Request,Response,NextFunction } from "express";

export const AuthenticateUser=(req:Request,res:Response,next:NextFunction)=>{\
    try{
        const authHeader=req.body.headers.Authentication;
        if(!authHeader){
            return res.status(401).json({message:"Not a valid user"})
        }
        const token=authHeader.split(" ")[1]
        if(!token){
            return res.status(401).json({message:"Token not founs"})
        }
    }
}