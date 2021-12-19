import {BaseAggregateRepository} from "../../../application-core/contracts/repositories/aggregate/BaseAggregateRepository";
import {UserAggregate, UserId} from "../../../domain/users/UserAggregate";
import {UserModel} from "../../database/user-model";
import {Injectable} from "@sbailleul/types_ioc/dist/decorators";
import {BaseUserRepository} from "../../../application-core/contracts/repositories/aggregate/BaseUserRepository";
import {Guid} from "guid-typescript";

@Injectable
export class UserRepository extends BaseUserRepository {
    async deleteAsync(aggregate: UserAggregate): Promise<any> {
        const userModel = await UserModel.findOne({where: {id: aggregate.id.toString()}})
        await userModel.destroy()
    }

    async getAllAsync(): Promise<UserAggregate[]> {
        const usersModels = await UserModel.findAll();
        return usersModels.map(m => UserRepository.modelToAggregate(m));
    }

    async getByIdAsync(id: UserId): Promise<UserAggregate | null> {
        const userModel = await UserModel.findOne({where: {id: id.toString()}});
        if (!userModel) {
            return null;
        }
        return UserRepository.modelToAggregate(userModel);
    }

    private static modelToAggregate(userModel: UserModel): UserAggregate {
        return new UserAggregate(
            new UserId(Guid.parse(userModel.id)),
            userModel.password, userModel.email, userModel.username);
    }

    getNewIdAsync(): Promise<UserId> {
        return Promise.resolve(new UserId(Guid.create()));
    }

    async setAsync(aggregate: UserAggregate): Promise<UserId> {
        const user = UserModel.build({
            id: aggregate.id.toString(),
            username: aggregate.username,
            password: aggregate.password,
            email: aggregate.email
        });
        await user.save();
        return aggregate.id;
    }


}
