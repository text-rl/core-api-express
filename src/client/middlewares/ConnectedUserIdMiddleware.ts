import {IMiddleware} from "./IMiddleware";
import e from "express";
import {constants} from "http2"
import * as jwt from "jsonwebtoken"
import {jwtConstants} from "../../common/constants";
import {Guid} from "guid-typescript";
import {ConnectedUserIdRequest} from "../types";


export class ConnectedUserIdMiddleware implements IMiddleware {
    handle(request: ConnectedUserIdRequest, response: e.Response, next: () => void): void {
        const authHeader = request.header(constants.HTTP2_HEADER_AUTHORIZATION);
        if (!authHeader || authHeader.indexOf("Bearer ") < 0 ) {
            next();
            return;
        }
        const token = authHeader.replace("Bearer ", "");
        const decodedToken = jwt.decode(token);
        const userId = decodedToken[jwtConstants.claimName]
        request.userId = Guid.parse(userId);
        next()
    }
}
