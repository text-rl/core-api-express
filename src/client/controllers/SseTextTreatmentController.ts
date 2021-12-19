import {InjectedProperty, InjectionTarget} from "@sbailleul/types_ioc/dist/decorators";
import {BaseTreatmentService} from "../../application-core/TreatmentService";
import {BaseController} from "./BaseController";
import express from "express";
import {constants} from "http2";
import {getBasePath} from "../utils/request-helpers";
import {ConnectedUserIdRequest} from "../types";
import {Guid} from "guid-typescript";
import Http2 from "http2";
import {BaseEventService} from "../../application-core/contracts/services/BaseEventService";

@InjectionTarget
export class SseTextTreatmentController extends BaseController {

    @InjectedProperty(BaseEventService)
    private readonly _eventService: BaseEventService
    path: string = "/sse-texttreatment";

    initializeRoutes(): void {
        this.subscribe = this.subscribe.bind(this);
        this.router.get(`${this.path}`, this.subscribe);
    }

    public async subscribe(request: ConnectedUserIdRequest, response: express.Response) {
        this._eventService.addClient(request);
    }
}
