import { NextFunction } from "express"
import { AnyZodObject } from "zod"


export const userAuthentication=(schema:AnyZodObject)=>{
    (res:Response,req:Request,next:NextFunction)
    try{
      schema.pasr
     
    }catch(error){
        return("Invalid username or password")
    }
}