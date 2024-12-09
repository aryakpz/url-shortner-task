import { USERTABLE } from "../";

// export const getUserFromDb = async (): Promise<any[]> => {
//     return new Promise((res, rej) => {
//         const display = "SELECT * FROM USERTABLE";
//         db.all(display, [], (err, row) => {
//             if (err) {
//                 rej([])
//             }
//             else {
//                res(row)
//             }
//         })
//     })
// }

// export const addUsersToDb = async (name: string, username: string, hashPassword: string): Promise<void> => {
//     console.log(name, username, hashPassword)
//     return new Promise((res, rej) => {
//         const insertQuery = "INSERT INTO USERTABLE (name,username,password) VALUES (?,?,?)";
//         db.run(insertQuery, [name, username, hashPassword], (err) => {
//             if (err) {
//                 rej(err)
//                 console.log(err.message)
//             }
//             else {
//                 console.log("success")
//                 res()
//             }

//         })
//     })
// }


// export const getSingleUser=async(username:string):Promise<any>=>{
//     console.log(username)
//     return new Promise((res,rej)=>{
//         const getQuery="SELECT * FROM USERTABLE WHERE username=?"
//         db.get(getQuery,[username],(err:any,row:any)=>{
//             if(err){
//                 rej(err)
//                 console.log("no such user")
//             }
//             else{
//                 res(row)
//             }
//         })
//     })
// }


// =============


// import db from "../database" 

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
     const getQuery =await USERTABLE.findOne({where:{usename:usename}})
     return getQuery
}




