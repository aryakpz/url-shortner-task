"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUserUrl = exports.addColumn = exports.findUrlFromDb = exports.updateFromDb = exports.deleteFromDb = exports.generateShortUrl = exports.addUrlToDb = void 0;
exports.getUrlsFromDb = getUrlsFromDb;
const database_1 = __importDefault(require("../database"));
// get the url function
function getUrlsFromDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const urls = yield new Promise((resolve, reject) => {
                database_1.default.all('SELECT * FROM URLTABLE', [], (err, rows) => {
                    if (err) {
                        console.error("Error fetching data from database:");
                        reject(err);
                    }
                    else {
                        const newData = rows.map((row) => (Object.assign(Object.assign({}, row), { link: `http://localhost:5001/api/${row.shorturl}` })));
                        resolve(newData);
                    }
                });
            });
            // console.log(456, urls);
            return urls;
        }
        catch (error) {
            console.error("Error fetching data from database:");
            return [];
        }
    });
}
// add new url into the db
const addUrlToDb = (url, length, shorturl, username) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const insertQuery = "INSERT INTO URLTABLE (url, length, shorturl,username) VALUES (?, ?, ?, ?)";
        database_1.default.run(insertQuery, [url, length, shorturl, username], (err) => {
            if (err) {
                console.error("Error inserting into database:", err.message);
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
});
exports.addUrlToDb = addUrlToDb;
// generating the shortkey
const generateShortUrl = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * characters.length);
        result += characters[index];
    }
    return result;
};
exports.generateShortUrl = generateShortUrl;
// delete from the database
const deleteFromDb = (shorturl) => {
    return new Promise((resolve, reject) => {
        const deleteQuery = "DELETE  FROM URLTABLE  WHERE shorturl=?";
        database_1.default.run(deleteQuery, [shorturl], function (err) {
            if (err) {
                console.log("Error deleting from database:", err.message);
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
};
exports.deleteFromDb = deleteFromDb;
// update the url
const updateFromDb = (url, shorturl) => {
    console.log(url, shorturl);
    return new Promise((resolve, reject) => {
        const updateQuery = "UPDATE URLTABLE SET url = ? WHERE shorturl = ?";
        database_1.default.run(updateQuery, [url, shorturl], function (err) {
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
exports.updateFromDb = updateFromDb;
//redirecting into main url
const findUrlFromDb = (shorturl) => {
    return new Promise((resolve, reject) => {
        const findUrl = "SELECT url FROM URLTABLE WHERE shorturl=?";
        database_1.default.get(findUrl, [shorturl], (err, row) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(row.url);
            }
        });
    });
};
exports.findUrlFromDb = findUrlFromDb;
//alter table
const addColumn = () => {
    return new Promise((res, rej) => {
        const alterQuery = `ALTER TABLE URLTABLE ADD COLUMN username varchar(30)`;
        database_1.default.run(alterQuery, (err) => {
            if (err) {
                rej(err);
            }
            else {
                res();
            }
        });
    });
};
exports.addColumn = addColumn;
// get urls of the current user
export const getCurrentUserUrl = (username) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((res, rej) => {
        console.log(22);
        const query = `SELECT * FROM URLTABLE WHERE username=?`;
        database_1.default.all(query, [username], (err, rows) => {
            if (err) {
                rej(err);
            }
            else {
                res(rows);
                console.log(5, rows);
            }
        });
    });
});
exports.getCurrentUserUrl = getCurrentUserUrl;
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
