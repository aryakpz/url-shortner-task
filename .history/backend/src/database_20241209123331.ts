// src/database.ts
// import { Database } from 'sqlite3'; 

// const db = new Database('./database.db', (err) => {
//     if (err) {
//         console.error("Failed to connect to the database:", err.message);
//     } else {
//         console.log("Connected to the SQLite database.");
//     }
// });

// export default db;

import Sequelize from "sequelize/types/sequelize.js";
import "dotenv/config";
import { Postgre } ;
import { URLTABLE } from "./models/url.models";
import { USERTABLE } from "./models/user.models";

const sequeliseOptions = {
    dialect: PostgresDialect,
    database: process.env.DB_BASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: 5432,
    models: [URLTABLE, USERTABLE],
    ssl: { rejectUnauthorized: false }
}

const sequelizeDbConnection = new Sequelize(sequeliseOptions)
console.log("dci")

export async function dbConnection() {
    sequelizeDbConnection.sync().then(() => {
        console.log("Table created or already exists!");
    }).catch((error) => {
        console.error('Error syncing table:', error);
    });
}



