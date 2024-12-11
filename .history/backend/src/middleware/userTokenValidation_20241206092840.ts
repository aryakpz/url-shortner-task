
import { NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: { username: string };
        }
    }
}

export const userTokenValidation = (req: Request, res: Response, next: NextFunction): void => {
    const header = req.headers.get('authorization'); // No TypeScript erro
    const token = header && header.split(' ')[1];

    if (!token) {
        res.status(200).json({ message: "Token is required" });
        return;
    }
    jwt.verify(token, "your_secret_key", (err: any, decode: any) => {
        if (err) {
            res.status(401).json({ message: "Invalid or expired token" });
            return;
        }
        req.user = decoded as { username: string };
        next();
    });
};
