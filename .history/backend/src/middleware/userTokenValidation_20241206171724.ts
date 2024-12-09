import jwt from "jsonwebtoken";
import { NextFunction } from "express";

export const authenticateUser = (req: any, res: any, next: NextFunction) => {
    console.log(555,req.body.head)
    try {

        const authHeader = req.body.headers.Authentication 
        if (!authHeader) {
            console.log("auth-error")
            return res.status(401).json({ message: "Not a valid user" });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Token not found" });
        }
        if (!process.env.JWT_KEY) {
            return res.status(401).json({ message: "key not found" });
        }
        // if (authHeader && authHeader.startsWith("Bearer")) {
        jwt.verify(token, process.env.JWT_KEY, (err:any, decoded: any) => {
            console.log(8989)
            if (err) {
                res.status(401);
                throw new Error("User is not uthorized")
            }
            console.log('sdcksd')
            req.user = decoded.user
            next();
        })
        // }

    } catch (err) {
        return res.status(401).json({ message: "Authentication failed" });
    }

}