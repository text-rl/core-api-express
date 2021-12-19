import {DataTypes, Model, Optional, Sequelize,} from "sequelize";
import {init as userInit} from './user-model';
import {DatabaseSettings} from "./DatabaseSettings";

export function sequelizeInit(): void {
    const settings = new DatabaseSettings();
    if(process.env.ENVIRONMENT === "Development"){
        console.info("DATABASE SETTINGS", settings.options)
    }
    const sequelize = new Sequelize(settings.options);
    userInit(sequelize)
}
