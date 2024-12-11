import { AnyZodObject, z } from "zod";
import { Request, Response, NextFunction } from "express";

export const userAuthentication = (schema: AnyZodObject) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (err) {
            if (err instanceof z.ZodError) {
                return res.status(400).json({
                    status: 400,
                    message: "Validation failed",
                    errors: err.errors,
                });
            }
            return res.status(500).json({ message: "Something went wrong" });
        }
    };
};   