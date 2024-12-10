import db from "../database";

// get the url function
export async function getUrlsFromDb(): Promise<any[]> {
    try {
        const urls = await new Promise<any[]>((resolve, reject) => {
            db.all('SELECT * FROM URLTABLE', [], (err, rows) => {
                if (err) {
                    console.error("Error fetching data from database:");
                    reject(err);
                } else {

                    const newData = rows.map((row: any) => ({
                        ...row,
                        link: `http://localhost:5001/api/${row.shorturl}`
                    }))
                    resolve(newData);
                }
            });
        });
        // console.log(456, urls);
        return urls;
    } catch (error) {
        console.error("Error fetching data from database:");
        return [];
    }
}

// add new url into the db
export const addUrlToDb = async (url: string, length: number, shorturl: string, username: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const insertQuery = "INSERT INTO URLTABLE (url, length, shorturl,username) VALUES (?, ?, ?, ?)";
        db.run(insertQuery, [url, length, shorturl, username], (err) => {
            if (err) {
                console.error("Error inserting into database:", err.message);
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

// generating the shortkey
export const generateShortUrl = (length: number): string => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * characters.length);
        result += characters[index];
    }
    return result;
};

// delete from the database
export const deleteFromDb = (shorturl: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const deleteQuery = "DELETE  FROM URLTABLE  WHERE shorturl=?";
        db.run(deleteQuery, [shorturl], function (err) {
            if (err) {
                console.log("Error deleting from database:", err.message);
                reject(err);
            } else {
                resolve();
            }
        });
    });

};

// update the url
export const updateFromDb = (url: string, shorturl: string): Promise<void> => {
    console.log(url, shorturl);

    return new Promise((resolve, reject) => {
        const updateQuery = "UPDATE URLTABLE SET url = ? WHERE shorturl = ?";
        db.run(updateQuery, [url, shorturl], function (err) {
            if (err) {
                console.error("Database update error:", err.message);
                return reject(err);
            }
            if (this.changes === 0) {
                return reject(new Error("No updates."));
            }

            console.log(`Update successful: ${this.changes}`);
            resolve();
        });
    });
};

//redirecting into main url
export const findUrlFromDb = (shorturl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const findUrl = "SELECT url FROM URLTABLE WHERE shorturl=?";
        db.get(findUrl, [shorturl], (err: any, row: { url: string }) => {
            if (err) {
                reject(err);
            } else {
                resolve(row.url);
            }
        });
    });
};

//alter table
export const addColumn = (): Promise<void> => {
    return new Promise((res, rej) => {
        const alterQuery = `ALTER TABLE URLTABLE ADD COLUMN username varchar(30)`;
        db.run(alterQuery, (err) => {
            if (err) {
                rej(err)
            }
            else {
                res();
            }

        })
    })
}

// get urls of the current user

export const getCurrentUserUrl = async (username: string): Promise<any[]> => {
    // console.log(88); // For debugging purposes
    // try {
    //     // Wrapping the db.all in a Promise
    //     const userUrls = await new Promise<any[]>((resolve, reject) => {
    //         db.all('SELECT * FROM URLTABLE WHERE username = ?',[username], (err: Error, rows: any[]) => {

    //             if (err) {
    //                 // Log the error for debugging
    //                 console.error("Error fetching URLs:", err);
    //                 reject(err); // Reject the promise with the error
    //             } else {
    //                 // Log the rows for debugging
    //                 console.log("User URLs:", rows,username);
    //                 resolve(rows); // Resolve with the fetched rows
    //             }
    //         });
    //     });
    //     return userUrls; // Return the result of the query
    // } catch (err) {
    //     console.error("Error in getCurrentUserUrl:", err);
    //     return []; // Return an empty array in case of an error
    // }



    return new Promise((res,rej)=>{
         const query="SELECT * FROM URLTABEL where username=?";
         db.run(query,[username],(err:Error,res:any)=>{
            if(err){
                rej(err)
            }
            else()
         })
    })
};
