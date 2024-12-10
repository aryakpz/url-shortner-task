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


export async function getSingleUser  (usename: string): Promise<any>  {
    if (!use) {
        return res.status(404).json({ message: "User not found." });
    }
    // Compare password
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
        return res.status(401).json({ message: "Invalid password." });
    }
    // Check the key is in the env
    if (!process.env.JWT_KEY) {
        throw new Error("key is nor in the env.");
    }
    // Generate token 
    const token = jwt.sign({ 
        user:{
            username:user.usename,
            id:user.id
        }
    }, process.env.JWT_KEY, {
        expiresIn: "1h",
    });

     const getQuery =await USERTABLE.findOne({where:{usename:usename}})
     return getQuery
}





