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





export async function getSingleUser  (usename: string): Promise<any>  {
    const getQuery =await USERTABLE.findOne({where:{usename:usename}})
    return getQuery;
}
