import { connect } from "amqplib";
import {RabbitMqSettings} from "./RabbitMqSettings";

export class RabbitMqConnector {
    private readonly _settings = new RabbitMqSettings();

    public connect(): ReturnType<typeof connect> {
        return connect({
            port: this._settings.port,
            hostname: this._settings.host,
            // password: this._settings.password,
            // username: this._settings.username
        })
    }
}
