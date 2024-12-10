import { NextFunction } from "express";


export const userTokenValidation=(req:Request,res:Response,next:NextFunction)=>{
    const token=req.headers['authorization']?.spl

}