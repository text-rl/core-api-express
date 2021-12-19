import {Guid} from "guid-typescript";
import {IPublicUser} from "../../../UserService";

export abstract class BaseReadUserRepository {
    abstract userExistsByEmailAsync(email: string): Promise<boolean>;

    abstract findUserIdByEmailAsync(email: string): Promise<Guid | undefined>;

    abstract findPublicUserById(id: Guid): Promise<IPublicUser | undefined>;
}

