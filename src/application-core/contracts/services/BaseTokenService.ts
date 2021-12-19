import {Guid} from "guid-typescript";

export abstract class BaseTokenService {
    abstract generateUserTokenAsync(userId: Guid): Promise<string>
}
