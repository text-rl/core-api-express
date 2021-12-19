import {connect} from "amqplib";
import {RabbitMqConnector} from "./RabbitMqConnector";
import {IAgent} from "./IAgent";
import {IRabbitMqHub} from "./IRabbitMqHub";

export interface IListener<TMessage> extends IAgent {
    on(message: TMessage): void;
}

export class ListenersHub implements IRabbitMqHub {
    private readonly _connector: RabbitMqConnector;
    private readonly _listeners: IListener<any>[];

    constructor(connector: RabbitMqConnector, listeners: IListener<any>[]) {
        this._connector = connector;
        this._listeners = listeners;
    }

    public async start(): Promise<any> {
        if (!this._listeners.length)
            return;
        const connection = await this._connector.connect();
        for (const listener of this._listeners) {
            const channel = await connection.createChannel();
            await channel.assertExchange(listener.exchange, listener.exchangeType, {durable: false});
            const q = await channel.assertQueue('');
            await channel.bindQueue(q.queue, listener.exchange, listener.routingKey);
            await channel.consume(q.queue, msg => {
                listener.on(JSON.parse(msg.content.toString()))
            })
        }
    }

}
