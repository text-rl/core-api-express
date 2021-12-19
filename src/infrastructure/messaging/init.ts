import {IListener, ListenersHub} from "./ListenersHub";
import {RabbitMqConnector} from "./RabbitMqConnector";
import {IProducer, ProducersHub} from "./ProducersHub";
import {RabbitMqSettings} from "./RabbitMqSettings";

export async function rabbitMqInit(listeners?: IListener<any>[], producers?: IProducer<any>[]): Promise<any> {
    const connector = new RabbitMqConnector();
    const rabbitMqSettings = new RabbitMqSettings();
    if(process.env.ENVIRONMENT === "Development"){
        console.info("RABBITMQ SETTINGS", rabbitMqSettings)
    }
    listeners = listeners ?? [];
    producers = producers ?? [];
    const listenerHub = new ListenersHub(connector, listeners);
    const producerHub = new ProducersHub(connector, producers);
    await listenerHub.start();
    await producerHub.start();
}
