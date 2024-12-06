import { NextFunction } from "express";

export const userTokenValidation=(req:Request,res:Response,next:NextFunction):vo=>{
    const token=req.headers['authorization']?.split('')[1];


}
