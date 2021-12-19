import {InjectedProperty, InjectionTarget} from "@sbailleul/types_ioc/dist/decorators";
import {BaseTreatmentService} from "../../application-core/TreatmentService";
import {IListener} from "../../infrastructure/messaging/ListenersHub";
import {UserId} from "../../domain/users/UserAggregate";
import {RabbitMqSettings} from "../../infrastructure/messaging/RabbitMqSettings";
import {Guid} from "guid-typescript";

export interface ITreatmentDoneMessage {
    userId: UserId;
    result: string;
}

@InjectionTarget
export class TreatmentDoneListener implements IListener<ITreatmentDoneMessage> {

    @InjectedProperty(BaseTreatmentService)
    private readonly _treatmentService: BaseTreatmentService;

    constructor() {
        const settings = new RabbitMqSettings();
        this.exchange = settings.treatmentExchange;
        this.exchangeType = "topic";
        this.routingKey = settings.doneTreatmentRoutingKey;
    }

    exchange: string;
    exchangeType: "direct" | "topic" | "headers" | "fanout" | "match" | string;
    routingKey: string;

    on(message: ITreatmentDoneMessage): void {
        this._treatmentService.notifyUser(
            new UserId(Guid.parse(message.userId.value.toString())),
            {result: message.result}
        );
    }


}
