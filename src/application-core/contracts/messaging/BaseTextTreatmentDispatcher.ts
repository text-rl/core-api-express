import {IDispatcher} from "./IDispatcher";
import {Guid} from "guid-typescript";

export interface ITextTreatmentMessage {
    userId: Guid;
    content: string;
}

export abstract class BaseTextTreatmentDispatcher implements IDispatcher<ITextTreatmentMessage> {
    abstract dispatch(msg: ITextTreatmentMessage): void;
}
