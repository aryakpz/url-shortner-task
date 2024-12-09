import { NextFunction } from "express";

export const userTokenValidation=(req:Request,res:Response,next:NextFunction):void=>{
    const auteader = req.headers['authorization'];
    const token=authHeader
}
