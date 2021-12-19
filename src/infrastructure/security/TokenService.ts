import {BaseTokenService} from "../../application-core/contracts/services/BaseTokenService";
import {Guid} from "guid-typescript";
import {JwtSettings} from "./JwtSettings";
import * as jwt from "jsonwebtoken"
import {Injectable} from "@sbailleul/types_ioc/dist/decorators";
import {jwtConstants} from "../../common/constants";

@Injectable
export class TokenService extends BaseTokenService {
    private readonly _jwtSettings = new JwtSettings();

    generateUserTokenAsync(userId: Guid): Promise<string> {
        const token = jwt.sign({
                [jwtConstants.claimName]: userId.toString()
            },
            this._jwtSettings.key,
            {
                algorithm: this._jwtSettings.algorithm,
                audience: this._jwtSettings.audience,
                issuer: this._jwtSettings.issuer, expiresIn: this._jwtSettings.minutesDuration * 60
            });
        return Promise.resolve(token);
    }


}
