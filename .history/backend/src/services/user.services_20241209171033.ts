import { USERTABLE } from "../models/user.models";

export async function getUserFromDb() {
    const display = await USERTABLE.findAll();
    return display;
}

export async function addUsersToDb(name: string, usename: string, password: string): Promise<any> {
    console.log(usename,"rnjfu")
    const insertQuery = await USERTABLE.create({ name, usename, password });
    return insertQuery;
}


// export async function getSingleUser  (usename: string,password:string): Promise<any>  {
//     if (!usename) {
//         return ("user not found")
//     }
//     // Compare password
//     const passwordCheck = await bcrypt.compare(password, user.password);
//     if (!passwordCheck) {
//         return res.status(401).json({ message: "Invalid password." });
//     }
//     // Check the key is in the env
//     if (!process.env.JWT_KEY) {
//         throw new Error("key is nor in the env.");
//     }
//     // Generate token 
//     const token = jwt.sign({ 
//         user:{
//             username:user.usename,
//             id:user.id
//         }
//     }, process.env.JWT_KEY, {
//         expiresIn: "1h",
//     });

//      const getQuery =await USERTABLE.findOne({where:{usename:usename}})
//      return getQuery
// }


import bcrypt from 'bcrypt'; // Ensure bcrypt is imported correctly
import jwt from 'jsonwebtoken'; // Ensure jwt is imported correctly
// import { USERTABLE } from './models'; // Adjust the import based on your project structure

export async function getSingleUser(username: string, password: string): Promise<any> {
    if (!username || !password) {
        return { message: "Username and password are required" };
    }

    // Fetch the user from the database
    const user = await USERTABLE.findOne({ where: { usename: username } });

    if (!user) {
        return { message: "User not found" };
    }

    // Compare password with hashed password in the database
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
        return { message: "Invalid password" };
    }

    // Check the JWT key is available in the environment
    if (!process.env.JWT_KEY) {
        throw new Error("JWT secret key is not found in the environment variables.");
    }

    // Generate JWT token
    const token = jwt.sign(
        {
            user: {
                username: user.usename,  // Corrected typo: 'usename' -> 'username'
                id: user.id,
            },
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
    );

    // Return user data along with the generated token
    return {
        user: {
            username: user.userame,
            id: user.id,
        },
        token: token,
    };
}




