import {Injectable, InjectedProperty, InjectionTarget} from "@sbailleul/types_ioc/dist/decorators";
import {BaseSecurityService} from "./contracts/services/BaseSecurityService";
import {UserAggregate, UserId} from "../domain/users/UserAggregate";
import {BaseReadUserRepository} from "./contracts/repositories/read/BaseReadUserRepository";
import {BaseUserRepository} from "./contracts/repositories/aggregate/BaseUserRepository";
import {BaseTokenService} from "./contracts/services/BaseTokenService";
import {Guid} from "guid-typescript";

export interface IRegisterUserCommand {
    username: string;
    password: string;
    email: string;
}

export interface ILoginUserQuery {
    password: string;
    email: string;
}

export interface GetPublicUserQuery {
    userId: Guid;
}

export interface ITokenResponse {
    token: string
}

export interface IPublicUser {
    id: string;
    username: string;
    email: string;
}

export abstract class BaseUserService {
    abstract registerUserAsync(cmd: IRegisterUserCommand): Promise<string>;

    abstract loginUserAsync(query: ILoginUserQuery): Promise<ITokenResponse>;

    abstract getPublicUser(query: GetPublicUserQuery): Promise<IPublicUser>;

}

@InjectionTarget
@Injectable
export class UserService extends BaseUserService {


    @InjectedProperty(BaseSecurityService)
    protected _securityService: BaseSecurityService;

    @InjectedProperty(BaseTokenService)
    protected _tokenService: BaseTokenService;

    @InjectedProperty(BaseReadUserRepository)
    private readonly _readUserRepository: BaseReadUserRepository;

    @InjectedProperty(BaseUserRepository)
    private readonly _userRepository: BaseUserRepository;

    public async registerUserAsync(cmd: IRegisterUserCommand): Promise<string> {
        const userExists = await this._readUserRepository.userExistsByEmailAsync(cmd.email);
        if (userExists) {
            throw new Error("Email already exists");
        }
        const password = await this._securityService.hashPasswordAsync(cmd.password);
        const id = await this._userRepository.getNewIdAsync();
        const user = new UserAggregate(id, password, cmd.email, cmd.username);
        await this._userRepository.setAsync(user);
        return id.toString();
    }

    public async loginUserAsync(query: ILoginUserQuery): Promise<ITokenResponse> {
        const userId = await this._readUserRepository.findUserIdByEmailAsync(query.email);
        if (!userId) {
            throw new Error(`User ${query.email} not found`);
        }
        const user = await this._userRepository.getByIdAsync(new UserId(userId));
        if (!await this._securityService.validatePasswordAsync(query.password, user.password)) {
            throw new Error(`Invalid credentials`);
        }
        const token = await this._tokenService.generateUserTokenAsync(userId)
        return {token};
    }

    public async getPublicUser(query: GetPublicUserQuery): Promise<IPublicUser> {
        const user = await this._readUserRepository.findPublicUserById(query.userId);
        if (!user) {
            throw new Error(`User not found by its id : ${query.userId.toString()}`);
        }
        return user;
    }


}
