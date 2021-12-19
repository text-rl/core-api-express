import {ConnectedUserIdRequest} from "../../../client/types";
import {Response} from "express";
import {Guid} from "guid-typescript";
import {T} from "@sbailleul/types_ioc";

export abstract class BaseEventService {
    abstract addClient(request: ConnectedUserIdRequest): void;

    abstract sendToClient<TData>(data: TData, clientId: Guid, type: string): void
}
