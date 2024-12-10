import { NextFunction } from "express"
import { AnyZodObject ,z} from "zod"


export const userAuthentication=(schema:AnyZodObject)=>{
    (res:Response,req:Request,next:NextFunction)=>{
        try{
            schema.parse(req.body);
            next()
           
          }catch(error){
              if(error instanceof z.ZodError){
                 return res.status(400).json({
                    status:400,
                    message:"Username and password is requires"
                 })
              }
              el
          }
    }
  
}