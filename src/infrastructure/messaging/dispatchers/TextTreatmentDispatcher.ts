import {
    BaseTextTreatmentDispatcher,
    ITextTreatmentMessage
} from "../../../application-core/contracts/messaging/BaseTextTreatmentDispatcher";
import {IProducer} from "../ProducersHub";
import {RabbitMqSettings} from "../RabbitMqSettings";
import {Injectable} from "@sbailleul/types_ioc/dist/decorators";

@Injectable
export class TextTreatmentDispatcher extends BaseTextTreatmentDispatcher implements IProducer<ITextTreatmentMessage> {
    dispatch(msg: ITextTreatmentMessage): void {
        this.send(msg);
    }

    constructor() {
        super();
        const settings = new RabbitMqSettings();
        this.exchange = settings.treatmentExchange;
        this.routingKey = settings.pendingTreatmentRoutingKey;
        this.exchangeType = "topic";
    }

    exchange: string;
    exchangeType: "direct" | "topic" | "headers" | "fanout" | "match" | string;
    routingKey: string;
    send?: (msg: ITextTreatmentMessage) => void


}
