import {genSalt, hash, compare} from "bcrypt"
import {BaseSecurityService} from "../../application-core/contracts/services/BaseSecurityService";
import {Injectable} from "@sbailleul/types_ioc/dist/decorators";
import * as assert from "assert";
import {verify} from "jsonwebtoken";

@Injectable
export class SecurityService extends BaseSecurityService {
    private readonly _workFactor = 10;

    private async saltAsync(): Promise<string> {
        return await genSalt(this._workFactor);
    }

    public async hashPasswordAsync(password: string): Promise<string> {
        return await hash(password, await this.saltAsync())
    }

    public async validatePasswordAsync(clearPassword: string, hashedPassword: string): Promise<boolean> {
        return compare(clearPassword, hashedPassword);
    }
}
