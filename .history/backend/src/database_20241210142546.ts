
import Sequelize from "@sequelize/core";
import "dotenv/config";
import { PostgresDialect } from "@sequelize/postgres";
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
        console.log("Table created successfully !");
    }).catch((error) => {
        console.error('Error syncing table:', error);
    });
}



