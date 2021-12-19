import express from 'express';
import * as bodyParser from "body-parser"
import {BaseController} from "./controllers/BaseController";
import {IMiddleware} from "./middlewares/IMiddleware";
import cors from "cors"
import promBundle from "express-prom-bundle";
import {collectDefaultMetrics, Registry} from "prom-client";

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers: BaseController[], middlewares: IMiddleware[], port: number) {
        this.app = express();
        this.port = port;
        this.initializeMiddlewares(middlewares);
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares(middlewares: IMiddleware[]) {
        const register = new Registry()
        register.setDefaultLabels({
            app: 'core-api-express'
        })
        collectDefaultMetrics({register})
        this.app.use(promBundle({includeMethod: true, promRegistry: register,  }))
        this.app.use(cors({exposedHeaders: '*'}))
        this.app.use(bodyParser.json());
        middlewares.forEach(m => this.app.use(m.handle));
    }

    private initializeControllers(controllers: BaseController[]) {
        controllers.forEach((controller) => {
            controller.initializeRoutes();
            this.app.use('/', controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;
