import { NextFunction } from "express";

export const userTokenValidation=(req:Request,res:Response,next:NextFunction):void=>{
    const header = req.headers['authorization'];
    const token=header && header.split('')[1];
    if(!token){
        res.status(403).json({message:"TOke"})
    }
}
