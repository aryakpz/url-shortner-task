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



export class URLTABLE extends Model<InferAttributes<URLTABLE>, InferCreationAttributes<URLTABLE>> {
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