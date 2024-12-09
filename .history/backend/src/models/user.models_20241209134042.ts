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

export class USERTABLE extends Model<InferAttributes<USERTABLE>, InferCreationAttributes<USERTABLE>> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>


    @Attribute(DataTypes.STRING)
    @NotNull
    declare name: string

    @Attribute(DataTypes.STRING)
    @NotNull
    @Unique
    declare usename: string

    @Attribute(DataTypes.STRING)
   
    declare password: string

}