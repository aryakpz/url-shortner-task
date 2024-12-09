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

export class USERTABLE extends Model<InferAttributes<USERTABLE>, InferCreationAttributes<USERTABLE>> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>


    @Attribute(DataTypes.STRING)
    @PrimaryKey
    @NotNull
    declare name: string

    @Attribute(DataTypes.STRING)
    @PrimaryKey
    @ANotNull
    declare usename: string

    @Attribute(DataTypes.STRING)
    @PrimaryKey
    @AutoIncrement
    declare password: string

}