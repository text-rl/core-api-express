import CoreContainer from "@sbailleul/types_ioc/dist/CoreContainer";
import {BaseUserRepository} from "../application-core/contracts/repositories/aggregate/BaseUserRepository";
import {UserRepository} from "./repositories/aggregate/UserRepository";
import {BaseReadUserRepository} from "../application-core/contracts/repositories/read/BaseReadUserRepository";
import {ReadUserRepository} from "./repositories/read/ReadUserRepository";
import {BaseSecurityService} from "../application-core/contracts/services/BaseSecurityService";
import {SecurityService} from "./security/SecurityService";
import {BaseTokenService} from "../application-core/contracts/services/BaseTokenService";
import {TokenService} from "./security/TokenService";
import {BaseTextTreatmentDispatcher} from "../application-core/contracts/messaging/BaseTextTreatmentDispatcher";
import {TextTreatmentDispatcher} from "./messaging/dispatchers/TextTreatmentDispatcher";

export function bindInfrastructureModules(): void {
    CoreContainer.bind(BaseUserRepository, {class: UserRepository});
    CoreContainer.bind(BaseReadUserRepository, {class: ReadUserRepository});
    CoreContainer.bind(BaseSecurityService, {class: SecurityService});
    CoreContainer.bind(BaseTokenService, {class: TokenService});
    CoreContainer.bind(BaseTextTreatmentDispatcher, {instance: new TextTreatmentDispatcher()});
}
