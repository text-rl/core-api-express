import express, {Router} from "express";

export abstract class BaseController {
    public abstract initializeRoutes(): void;
    public router: Router = express.Router();
    public abstract path: string;
}
