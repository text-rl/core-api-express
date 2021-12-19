import dotenv from "dotenv";
dotenv.config();

import {sequelizeInit} from "../infrastructure/database/init";
import App from "./App";
import {UserController} from "./controllers/UserController";
import {TextTreatmentController} from "./controllers/TextTreatmentController";
import {PrometheusController} from "./controllers/PrometheusController";
import {SseTextTreatmentController} from "./controllers/SseTextTreatmentController";
import {TreatmentDoneListener} from "./messaging/TreatmentDoneListener";
import {BaseTextTreatmentDispatcher} from "../application-core/contracts/messaging/BaseTextTreatmentDispatcher";
import {TextTreatmentDispatcher} from "../infrastructure/messaging/dispatchers/TextTreatmentDispatcher";
import {bindModules} from "./ioc";

bindModules();

import CoreContainer from "@sbailleul/types_ioc/dist/CoreContainer";
import {ConnectedUserIdMiddleware} from "./middlewares/ConnectedUserIdMiddleware";
import {rabbitMqInit} from "../infrastructure/messaging/init";
import {collectDefaultMetrics, Registry} from "prom-client";

// const register = new Registry()
// collectDefaultMetrics({register})

sequelizeInit();
const userController = CoreContainer.getInstance<UserController>(UserController);
const sseTextTreatmentController = CoreContainer.getInstance<SseTextTreatmentController>(SseTextTreatmentController);
const textTreatmentController = CoreContainer.getInstance<TextTreatmentController>(TextTreatmentController);
// const prometheusController = CoreContainer.getInstance<PrometheusController>(PrometheusController);
const app = new App([userController, textTreatmentController, sseTextTreatmentController], [new ConnectedUserIdMiddleware()], process.env.PORT as unknown as number);

const treatmentDoneListeners = CoreContainer.getInstance<TreatmentDoneListener>(TreatmentDoneListener)
const pendingTreatmentProducer = CoreContainer.getInstance<TextTreatmentDispatcher>(BaseTextTreatmentDispatcher)


rabbitMqInit([treatmentDoneListeners], [pendingTreatmentProducer]).then(_ => {
    app.listen();
}, reason => {
    console.log(reason);
});
