import CoreContainer from "@sbailleul/types_ioc/dist/CoreContainer";
import {bindInfrastructureModules} from "../infrastructure/ioc";
import {bindApplicationCoreModule} from "../application-core/ioc";
import {BaseEventService} from "../application-core/contracts/services/BaseEventService";
import {EventService} from "./realtime-connection/EventService";

export function bindModules(): void {
    bindInfrastructureModules();
    bindApplicationCoreModule();
    CoreContainer.bind(BaseEventService, {class: EventService});
    CoreContainer.resolve();
}
