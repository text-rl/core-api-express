import {InjectedProperty, InjectionTarget} from "@sbailleul/types_ioc/dist/decorators";
import {BaseTreatmentService} from "../../application-core/TreatmentService";
import {BaseController} from "./BaseController";
import express from "express";
import {constants} from "http2";
import {getBasePath} from "../utils/request-helpers";
import {ConnectedUserIdRequest} from "../types";
import {Guid} from "guid-typescript";

@InjectionTarget
export class TextTreatmentController extends BaseController {

    @InjectedProperty(BaseTreatmentService)
    private readonly _treatmentService: BaseTreatmentService
    path: string = "/texttreatment";

    initializeRoutes(): void {
        this.run = this.run.bind(this);
        this.router.post(`${this.path}`, this.run);
    }

    public async run(request: ConnectedUserIdRequest, response: express.Response) {
        try {
            await this._treatmentService.runTextTreatment({userId: request.userId, content: request.body.content})
            response.send()
        } catch (e) {
            response.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(e);
        }
    }
}
