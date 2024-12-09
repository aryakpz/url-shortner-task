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



export class Urls extends Model<InferAttributes<Urls>, InferCreationAttributes<Urls>> {
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
    @Attribute(DataTypes.s)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>
}