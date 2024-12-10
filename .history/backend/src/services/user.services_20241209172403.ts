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


// export async function getSingleUser  (usename: string): Promise<any>  {
//      const getQuery =await USERTABLE.findOne({where:{usename:usename}})
//      return getQuery
// }
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';


export async function getSingleUser(username: string, password: string): Promise<any> {
    // Validate that both username and password are provided
    if (!username || !password) {
        return { message: "Username and password are required" };
    }

    // Fetch user from the database using the provided username
    const user = await USERTABLE.findOne({ where: { usename: username } });

    // If the user is not found, return an appropriate message
    if (!user) {
        return { message: "User not found" };
    }

    // Compare the provided password with the hashed password in the database
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
        return { message: "Invalid password" };
    }

    // Check if the JWT secret key exists in the environment variables
    if (!process.env.JWT_KEY) {
        throw new Error("JWT secret key is missing from environment variables.");
    }

    // Generate a JWT token with a 1-hour expiration time
    const token = jwt.sign(
        {
            user: {
                username: user.usename,  // Corrected typo: 'usename' -> 'username'
                id: user.id,
            },
        },
        process.env.JWT_KEY,  // Secret key for token signing
        { expiresIn: "1h" }  // Token expiration time
    );

    // Return the user data and the generated token
    return {
        user:{
            us
        }
    };
}
