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


// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// declare global {
//     namespace Express {
//         interface Request {
//             user?: { username: string };
//         }
//     }
// }

// export const userTokenValidation = (req: Request, res: Response, next: NextFunction): void => {
//     try {
//         const authHeader = req.headers.authorization;
//         if (!authHeader) {
//             res.status(403).json({ message: "Token is required" });
//             return;
//         }
//         const token = authHeader.split(" ")[1];
//         if (!token) {
//             res.status(403).json({ message: "Invalid Authorization format" });
//             return;
//         }
//         const decoded = jwt.verify(token, process.env.JET_KEY) as { username: string };
//         req.user = decoded;
//         next();
//     } catch (error) {
//         res.status(401).json({ message: "Invalid or expired token" });
//     }
// };
