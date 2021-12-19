import {BaseEventService} from "../../application-core/contracts/services/BaseEventService";
import {ConnectedUserIdRequest} from "../types";
import Http2, {constants} from "http2";
import {Request, Response} from "express";
import {Guid} from "guid-typescript";
import {Injectable} from "@sbailleul/types_ioc/dist/decorators";

interface Event<TData> {
    data: TData,
    type?: string
}

@Injectable
export class EventService extends BaseEventService {

    private static _clients: Map<string, Response> = new Map<string, Response>();

    addClient(request: ConnectedUserIdRequest): void {
        EventService.editResponse(request.res);
        EventService._clients.set(request.userId.toString(), request.res)
        EventService.handleClientClosed(request, request.userId);
    }


    private static handleClientClosed(request: Request, clientId: Guid) {
        request.on('close', () => {
            EventService._clients.delete(clientId.toString())
        });
    }

    private static editResponse(response: Response): void {
        response.setHeader(constants.HTTP2_HEADER_CONTENT_TYPE, "text/event-stream");
        response.setHeader(constants.HTTP2_HEADER_CONNECTION, constants.HTTP2_HEADER_KEEP_ALIVE);
        response.setHeader(constants.HTTP2_HEADER_CACHE_CONTROL, 'no-cache');
        response.status(Http2.constants.HTTP_STATUS_OK);
    }

    sendToClient<TData>(data: TData, clientId: Guid, type: string): void {
        const event: Event<TData> = {data, type}
        const clients = EventService._clients;
        clients.get(clientId.toString())?.write(`data: ${JSON.stringify(event)}\n\n`)
    }

}
