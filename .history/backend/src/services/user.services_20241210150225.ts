import { USERTABLE } from "../models/user.models";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function getUserFromDb() {
    const display = await USERTABLE.findAll();
    return display;
}

export async function addUsersToDb(name: string, usename: string, password: string): Promise<any> {
    // console.log(usename, "rnjfu")
    const insertQuery = await USERTABLE.create({ name, usename, password });
    return insertQuery; 
}

export async function getSingleUser(username: string, password: string): Promise<any> {
    // Fetch single user from db
    const user = await USERTABLE.findOne({ where: { usename: username } });
    if (!user) {
        return { message: "User not found" };
    }
    // Compare the password with the 
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {           
        return { message: "Invalid password" };
    }
    if (!process.env.JWT_KEY) {
        throw new Error("the key is not presented.");th
    }                              
    const token = jwt.sign(           
        {             
            user: {                     
                username: user.usename,              
                id: user.id,            
            },      
        },           
        process.env.JWT_KEY,
        { expiresIn: "1h" }             
    );
    return {                  
        username: user.usename,
        token: token,
    };                      
}              
                              