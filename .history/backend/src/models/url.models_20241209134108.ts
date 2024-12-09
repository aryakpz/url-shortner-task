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
    Unique,
} from "@sequelize/core/decorators-legacy";

export class URLTABLE extends Model<InferAttributes<URLTABLE>, InferCreationAttributes<URLTABLE>> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>

    @Attribute(DataTypes.STRING)
    @NotNull
    @Unique
    declare username: string

    @Attribute(DataTypes.STRING)
    @NotNull
    declare url: string

    @Attribute(DataTypes.STRING)
    @NotNull
    @Unique
    declare shorturl: string

    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare length: number

}