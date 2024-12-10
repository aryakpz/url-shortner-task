import { NextFunction } from "express"


export const userAuthentication=(schema:Zod)=>{
    (res:Response,req:Request,next:NextFunction)
    try{

     
    }catch(error){
        return("Invalid username or password")
    }
}