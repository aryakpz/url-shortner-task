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
    declare usermodel: Crea

    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>
}