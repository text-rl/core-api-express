import {IAgent} from "./IAgent";
import {connect} from "amqplib";
import {RabbitMqConnector} from "./RabbitMqConnector";
import {IRabbitMqHub} from "./IRabbitMqHub";

export interface IProducer<TMessage> extends IAgent {
    send?: (message: TMessage) => void;
}

export class ProducersHub implements IRabbitMqHub {
    private readonly _connector: RabbitMqConnector;
    private readonly _producers: IProducer<any>[];

    constructor(connector: RabbitMqConnector, producers: IProducer<any>[]) {
        this._connector = connector;
        this._producers = producers;
    }

    async start(): Promise<any> {
        if (!this._producers.length) return;
        const connection = await this._connector.connect();
        for (const producer of this._producers) {
            const channel = await connection.createChannel();
            await channel.assertExchange(producer.exchange, producer.exchangeType, {durable: false});
            producer.send = message => {
                channel.publish(producer.exchange, producer.routingKey, Buffer.from(JSON.stringify(message)))
            }
        }
    }
}
