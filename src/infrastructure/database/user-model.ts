// And with a functional approach defining a module looks like this
import {DataTypes, Model, ModelDefined, Optional, Sequelize} from "sequelize";

// These are all the attributes in the User model
interface UserAttributes {
    id: string;
    email: string;
    username: string;
    password: string;
}

// Some attributes are optional in `User.build` and `User.create` calls
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {
}

export class UserModel extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {
    public id!: string;
    public email!: string;
    public username!: string;
    public password!: string;
}

export function init(sequelize: Sequelize) {
    UserModel.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
            },
            email: {
                type: new DataTypes.STRING(128),
                allowNull: false,
            },
            username: {
                type: new DataTypes.STRING(128),
                allowNull: false,
            },
            password: {
                type: new DataTypes.STRING(128),
                allowNull: false,
            },
        },
        {
            timestamps: false,
            tableName: "user",
            sequelize, // passing the `sequelize` instance is required
        }
    );
}
