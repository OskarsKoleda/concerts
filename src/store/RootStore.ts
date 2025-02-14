import ApplicationStore from "./ApplicationStore";
import { EventDetailsStore } from "./eventDetails/EventDetailsStore.ts";
import { EventListStore } from "./eventList/EventListStore.ts";
import { Transport } from "./transport/rootTransport/Transport";

class RootStore {
  public readonly transport: Transport;

  public readonly eventListStore: EventListStore;
  public readonly eventDetailsStore: EventDetailsStore;
  public readonly applicationStore: ApplicationStore;

  constructor() {
    this.transport = new Transport();

    this.applicationStore = new ApplicationStore();
    this.eventListStore = new EventListStore(this.transport.eventListTransport);
    this.eventDetailsStore = new EventDetailsStore(
      this.transport.eventDetailsTransport,
      this.transport.cloudinaryTransport,
    );
  }
}

export default RootStore;
