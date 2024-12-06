import db from "../database";


export const getUserFromDb = async (): Promise<any[]> => {
    return new Promise((res, rej) => {
        const display = "SELECT * FROM USERTABLE";
        db.all(display, [], (err, row) => {
            if (err) {
                rej([])
            }
            else {
               res(row)
            }
        })
    })
}

export const addUsersToDb = async (name: string, username: string, hashPassword: string): Promise<void> => {
    console.log(name, username, hashPassword)
    return new Promise((res, rej) => {
        const insertQuery = "INSERT INTO USERTABLE (name,username,password) VALUES (?,?,?)";
        db.run(insertQuery, [name, username, hashPassword], (err) => {
            if (err) {
                rej(err)
                console.log(err.message)
            }
            else {
                console.log("success")
                res()
            }

        })
    })
}


export const getSingleUser=async(username:string):Promise<any>=>{
    console.log(username)
    return new Promise((res,rej)=>{
        const getQuery="SELECT * FROM USERTABLE WHERE username=?"
        db.get(getQuery,[usern],(err:any,row:any)=>{
            if(err){
                rej(err)
                console.log("no such user")
            }
            else{
                res(row)
            }
        })
    })
}

export const UserLogin=async(username:string,password:string):Promise<any>=>{
    return new Promise((res,rej)=>{
        const passwordFromDb="SELECT * FROM USERTABLE WHERE USERNAME=? AND PASSWORD=?"
        db.get(passwordFromDb,[],(err:any,row:any)=>{
            if(err){
                rej(err)
            }
            else{
                res(row)
            }
        })
    })
}