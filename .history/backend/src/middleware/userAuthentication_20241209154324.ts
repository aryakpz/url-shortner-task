// import { NextFunction, Request, Response } from "express"
// import { AnyZodObject, z } from "zod"


// export const userAuthentication = (schema: AnyZodObject) =>
// {
//     (res: Response, req: Request, next: NextFunction) => {
//         try {
//             schema.parse(req.body);
//             next()
//             console.log("validation")
//         } catch (error) {
//             if (error instanceof z.ZodError) {
//                 return res.status(400).json({
//                     status: 400,
//                     message: "Username and password is requires"
//                 })
//             }
//             next(error)
//         }
//     }
// }
import { AnyZodObject, z } from "zod";
import { Request, Response, NextFunction } from "express";

export const userAuthentication
 = (res:Response,req:Request,next:NextFunction) =>{
    try{
        const user=req.body;
        if(!user){
            return res.status(401).json({message:"Both fields are required!"})
        }

    }catch(err){
        return res.status(401).json({message:"Something went wrong"})
    }
   
    };
