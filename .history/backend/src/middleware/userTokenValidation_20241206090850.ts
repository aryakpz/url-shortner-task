import { NextFunction } from "express";
impo

export const userTokenValidation=(req:Request,res:Response,next:NextFunction)=>{
    const token=req.headers['authorization']?.split('')[1];


}