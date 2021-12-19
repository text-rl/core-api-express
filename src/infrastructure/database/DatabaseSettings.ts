import {Dialect, Options} from "sequelize";

export class DatabaseSettings {
    private dialect = process.env.SQL_DIALECT as Dialect;
    private host = process.env.SQL_HOST;
    private password = process.env.SQL_PWD;
    private username = process.env.SQL_USERNAME;
    private database = process.env.SQL_DATABASE;

    get options(): Options {
        return {
            dialect: this.dialect,
            password: this.password,
            host: this.host,
            username: this.username,
            database: this.database
        }
    }
}
