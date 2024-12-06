import { NextFunction } from "express";

export const userTokenValidation=(req:Request,res:Response,next:NextFunction):void=>{
    const he=req.headers['authorization']


}
