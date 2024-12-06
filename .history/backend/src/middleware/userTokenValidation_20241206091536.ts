import { NextFunction } from "express";
import { Jwt } from "jsonwebtoken";

export const userTokenValidation=(req:Request,res:Response,next:NextFunction):void=>{
    const header = req.headers['authorization'];
    const token=header && header.split('')[1];
    if(!token){
        res.status(403).json({message:"Token is required"});
        return;
    }
    jwt.verify(token,"your")
}
