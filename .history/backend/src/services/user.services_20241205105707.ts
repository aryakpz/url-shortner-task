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


export const UserLogin=async(username:string,password:string)