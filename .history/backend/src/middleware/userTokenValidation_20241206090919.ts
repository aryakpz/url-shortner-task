import { NextFunction } from "express";
import { Jwt } from "jsonwebtoken";

export const userTokenValidation=(req:Request,res:Response,next:NextFunction)=>{
    const token=req.headers.ge['authorization']?.split('')[1];


}