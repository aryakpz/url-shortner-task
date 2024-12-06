import jwt from "jsonwebtoken";
import { Request,Response,NextFunction } from "express";

export const AuthenticateUser=(req:Request,res:Response,next:NextFunction)=>{\
    try{
        const authHeader=req.body.headers.Authentication;
        if(!authHeader){
            retun
        }
    }
}