import { NextFunction } from "express";

export const userTokenValidation=(req:Request,res:Response,next:NextFunction):void=>{
    const header=req.headers['authorization']


}
