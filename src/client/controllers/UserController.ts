import {BaseController} from "./BaseController";
import express from "express";
import {Injectable, InjectedProperty, InjectionTarget} from "@sbailleul/types_ioc/dist/decorators";
import {BaseUserService} from "../../application-core/UserService";
import {getBasePath} from "../utils/request-helpers";
import {constants} from "http2"
import {ConnectedUserIdRequest} from "../types";

@InjectionTarget
export class UserController extends BaseController {
    public path = '/users';
    @InjectedProperty(BaseUserService)
    public _userService: BaseUserService;

    private readonly registrationSegment = `registration`;

    private readonly authenticationSegment = `authentication`;
    private readonly meSegment = `me`;

    public initializeRoutes(): void {
        this.registration = this.registration.bind(this)
        this.authentication = this.authentication.bind(this)
        this.me = this.me.bind(this)
        this.router.post(`${this.path}/${this.registrationSegment}`, this.registration);
        this.router.post(`${this.path}/${this.authenticationSegment}`, this.authentication);
        this.router.get(`${this.path}/${this.meSegment}`, this.me);
    }

    public async registration(request: express.Request, response: express.Response) {
        try {
            await this._userService.registerUserAsync(request.body)
            response.status(constants.HTTP_STATUS_CREATED).location(`${getBasePath(request)}${this.path}/${this.meSegment}`).send()
        } catch (e) {
            response.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(e);
        }
    }

    public async authentication(request: express.Request, response: express.Response) {
        try {
            const token = await this._userService.loginUserAsync(request.body)
            response.status(constants.HTTP_STATUS_CREATED).json(token)
        } catch (e) {
            response.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(e);
        }
    }

    public async me(request: ConnectedUserIdRequest, response: express.Response) {
        try {
            const user = await this._userService.getPublicUser({userId: request.userId})
            response.json(user)
        } catch (e) {
            response.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(e);
        }
    }

}
