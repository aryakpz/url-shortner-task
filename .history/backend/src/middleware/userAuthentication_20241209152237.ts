import { NextFunction } from "express"
import { AnyZodObject } from "zod"


export const userAuthentication=(schema:AnyZodObject)=>{
    (res:Response,req:Request,next:NextFunction)=>{
        try{
            schema.parse(req.body);
            next()
           
          }catch(error){
              if(err instanceof z.zo){

              }
          }
    }
  
}