// import { NextFunction } from "express";
// import jwt from "jsonwebtoken";

// declare global {
//     namespace Express {
//         interface Request {
//             user?: { username: string };
//         }
//     }
// }

// export const userTokenValidation = (req: Request, res: Response, next: NextFunction): void => {
//     const header = req.headers.get('authorization');
//     const token = header && header.split(' ')[1];

//     if (!token) {
//         res.status(200).json({ message: "Token is required" });
//         return;
//     }
//     jwt.verify(token, "your_secret_key", (err: any, decode: any) => {
//         if (err) {
//             res.status(401).json({ message: "Invalid or expired token" });
//             return;
//         }
//         req.user = decoded as { username: string };
//         next();
//     });
// };

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend the Express Request interface
declare global {
    namespace Express {
        interface Request {
            user?: { username: string };
        }
    }
}

export const userTokenValidation = (req: Request, res: Response, next: NextFunction): void => {
    try {
        // Get the authorization header
        const authHeader = req.headers.authorization;

        // Ensure the header exists
        if (!authHeader) {
            res.status(403).json({ message: "Token is required" });
            return;
        }

        // Extract the token from the Bearer scheme
        const token = authHeader.split(" ")[1];
        if (!token) {
            res.status(403).json({ message: "Invalid Authorization format" });
            return;
        }

        // Verify the token
        const decoded = jwt.verify(token, "your_secret_key") as { username: string };

        // Attach the user to the request object
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
