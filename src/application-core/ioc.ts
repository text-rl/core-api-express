import CoreContainer from "@sbailleul/types_ioc/dist/CoreContainer";
import {BaseUserService, UserService} from "./UserService";
import {BaseTreatmentService, TreatmentService} from "./TreatmentService";

export function bindApplicationCoreModule(){
    CoreContainer.bind(BaseUserService, {class: UserService})
    CoreContainer.bind(BaseTreatmentService, {class: TreatmentService})
}
