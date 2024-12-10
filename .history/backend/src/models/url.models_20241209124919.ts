import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "@sequelize/core"
import {
    Attribute,
    AutoIncrement,
    NotNull,
    PrimaryKey,
} from "@sequelize/core/decorators-legacy";

import { PostgresDialect } from "@sequelize/postgres";
import { URL } from "url";



export class URLTABLE extends Model<InferAttributes<URLTABLE>, InferCreationAttributes<URL>> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>

    @Attribute(DataTypes.STRING)
    @PrimaryKey
    @AutoIncrement
    declare username: string

    @Attribute(DataTypes.STRING)
    @PrimaryKey
    @AutoIncrement
    declare url: string

    @Attribute(DataTypes.STRING)
    @PrimaryKey
    @AutoIncrement
    declare shorturl: string

    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare length: number

}