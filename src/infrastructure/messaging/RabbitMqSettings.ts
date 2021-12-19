import {parseInt} from "lodash";

export class RabbitMqSettings {
    public readonly host: string = process.env.RABBIT_MQ_SETTINGS_HOST;
    public readonly username: string = process.env.RABBIT_MQ_SETTINGS_USERNAME;
    public readonly password: string = process.env.RABBIT_MQ_SETTINGS_PASSWORD;
    public readonly port: number = parseInt(process.env.RABBIT_MQ_SETTINGS_PORT, 10);
    public readonly pendingTreatmentRoutingKey: string = process.env.RABBIT_MQ_SETTINGS_PENDING_TREATMENT_ROUTING_KEY;
    public readonly doneTreatmentRoutingKey: string = process.env.RABBIT_MQ_SETTINGS_DONE_TREATMENT_ROUTING_KEY;
    public readonly treatmentExchange: string = process.env.RABBIT_MQ_SETTINGS_TREATMENT_EXCHANGE;

}
