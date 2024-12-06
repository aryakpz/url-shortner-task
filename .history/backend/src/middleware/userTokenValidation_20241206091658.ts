import { NextFunction } from "express";
import { Jwt } from "jsonwebtoken";

export const userTokenValidation=(req:Request,res:Response,next:NextFunction):void=>{
    const header = req.headers['authorization'];
    const token=header && header.split('')[1];
    if(!token){
        res.status(403).json({message:"Token is required"});
        return;
    }
    jwt.verify(token,"your_secret_key",(err,decode)=>{
        if(err){
            res.status(401).json({message:"Invalid or expired token"});
            return;
        }
        req.user=decoded
    })
}
