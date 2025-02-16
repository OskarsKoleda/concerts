import ApplicationStore from "./ApplicationStore";
import { EventDetailsRequestStore } from "./eventDetails/eventDetailsRequestStore/EventDetailsRequestStore.ts";
import { EventListStore } from "./eventList/EventListStore.ts";
import { Transport } from "./transport/rootTransport/Transport";
import { EventDetailsUIStore } from "./eventDetails/eventDetailUIStore/EventDetailsUIStore.ts";

class RootStore {
  public readonly transport: Transport;

  public readonly eventListStore: EventListStore;
  public readonly eventDetailsRequestStore: EventDetailsRequestStore;
  public readonly eventDetailsUIStore: EventDetailsUIStore;
  public readonly applicationStore: ApplicationStore;

  constructor() {
    this.transport = new Transport();

    this.applicationStore = new ApplicationStore();
    this.eventListStore = new EventListStore(this.transport.eventListTransport);
    this.eventDetailsUIStore = new EventDetailsUIStore();
    this.eventDetailsRequestStore = new EventDetailsRequestStore(
      this.transport.eventDetailsTransport,
      this.transport.cloudinaryTransport,
      this.eventDetailsUIStore,
    );
  }
}

export default RootStore;
