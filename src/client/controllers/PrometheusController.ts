import {BaseController} from "./BaseController";
import {Request, Response} from "express"
import {collectDefaultMetrics, Registry} from "prom-client";
import {constants} from "http2";

export class PrometheusController extends BaseController {
    path: string = "/metrics"
    private readonly _register: Registry;

    constructor() {
        super();
        this._register = new Registry()
        this._register.setDefaultLabels({
            app: 'core-api-express'
        })
        collectDefaultMetrics({register: this._register})
    }

    initializeRoutes(): void {
        this.metrics = this.metrics.bind(this)
        this.router.get(this.path, this.metrics)
    }

    public async metrics(request: Request, response: Response) {
        response.setHeader(constants.HTTP2_HEADER_CONTENT_TYPE, this._register.contentType)
        const metrics = await this._register.metrics();
        response.send(metrics);
    }


}
