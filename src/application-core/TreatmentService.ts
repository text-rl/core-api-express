import {Guid} from "guid-typescript";
import {Injectable, InjectedProperty, InjectionTarget} from "@sbailleul/types_ioc/dist/decorators";
import {BaseTextTreatmentDispatcher} from "./contracts/messaging/BaseTextTreatmentDispatcher";
import {UserId} from "../domain/users/UserAggregate";
import {BaseEventService} from "./contracts/services/BaseEventService";

export interface IRunTextCommand {
    content: string;
    userId: Guid;
}

export interface ITextTreatmentDoneEvent {
    result: string;
}

export abstract class BaseTreatmentService {
    abstract runTextTreatment(cmd: IRunTextCommand): Promise<any>;
    abstract notifyUser(userId: UserId, event: ITextTreatmentDoneEvent):void;
}

@Injectable
@InjectionTarget
export class TreatmentService extends BaseTreatmentService {
    @InjectedProperty(BaseTextTreatmentDispatcher)
    private readonly _dispatcher: BaseTextTreatmentDispatcher;

    @InjectedProperty(BaseEventService)
    private readonly _eventService: BaseEventService;

    runTextTreatment(cmd: IRunTextCommand): Promise<any> {
        this._dispatcher.dispatch(cmd);
        return Promise.resolve(undefined);
    }

    notifyUser(userId: UserId, event: ITextTreatmentDoneEvent) {
        this._eventService.sendToClient(event, userId.value, "onTreatmentDone")
    }

}
