import {UserModel} from "../../database/user-model";
import {BaseReadUserRepository} from "../../../application-core/contracts/repositories/read/BaseReadUserRepository";
import {Injectable} from "@sbailleul/types_ioc/dist/decorators";
import {Guid} from "guid-typescript";
import {IPublicUser} from "../../../application-core/UserService";

@Injectable
export class ReadUserRepository extends BaseReadUserRepository {
    public async userExistsByEmailAsync(email: string): Promise<boolean> {
        const user = await UserModel.findOne({where: {email}});
        return !!user;
    }

    public async findUserIdByEmailAsync(email: string): Promise<Guid | undefined> {
        const user = await UserModel.findOne({where: {email}});
        return !!user ? Guid.parse(user.id) : undefined;
    }

    async findPublicUserById(id: Guid): Promise<IPublicUser | undefined> {
        const user = await UserModel.findOne({where: {id: id.toString()}});
        return !!user ? {id: user.id, username: user.username, email: user.email} : undefined;
    }
}
