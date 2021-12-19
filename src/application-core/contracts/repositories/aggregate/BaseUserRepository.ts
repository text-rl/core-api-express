import {BaseAggregateRepository} from "./BaseAggregateRepository";
import {UserAggregate, UserId} from "../../../../domain/users/UserAggregate";

export abstract class BaseUserRepository extends BaseAggregateRepository<UserId, UserAggregate>{

}
