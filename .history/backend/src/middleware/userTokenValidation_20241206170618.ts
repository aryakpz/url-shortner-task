import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const AuthenticateUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.body.headers.Authentication || req.body.headers.authentication;
        if (!authHeader) {
            return res.status(401).json({ message: "Not a valid user" });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Token not found" });
        }
        if (!process.env.JWT_KEY) {
            return res.status(401).json({ message: "key not found" });
        }
        if (authHeader && authHeader.startsWith("Bearer")) {
            jwt.verify(token, process.env.JWT_KEY, (err: any, decoded: any) => {
                if (err) {
                    res.status(401);
                    throw new Error("User is not uthorized")
                }
                console.log(decoded)
                req.user=decoded.user
          })
        }


        next();

    } catch (err) {
        return res.status(401).json({ message: "Authentication failed" });
    }

}