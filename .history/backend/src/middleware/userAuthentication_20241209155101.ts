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

// Middleware to validate user input
export const userAuthentication = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate the request body using the provided schema
      schema.parse(req.body);

      // If validation is successful, continue to the next middleware
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          status: 400,
          message: "Validation failed",
          errors: err.errors, // Send detailed validation errors
        });
      }
      return res.status(500).json({ message: "Something went wrong" });
    }
  };
};