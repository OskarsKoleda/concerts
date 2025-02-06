import ApplicationStore from "./ApplicationStore";
import { EventDetailsStore } from "./eventDetails/EventDetailsStore.ts";
import { EventListStore } from "./eventList/EventListStore.ts";
import { Transport } from "./transport/rootTransport/Transport";

class RootStore {
  public readonly transport: Transport;

  public readonly concertListStore: EventListStore;
  public readonly concertDetailsStore: EventDetailsStore;
  public readonly applicationStore: ApplicationStore;

  constructor() {
    this.transport = new Transport();

    this.applicationStore = new ApplicationStore();
    this.concertListStore = new EventListStore(this.transport.concertListTransport);
    this.concertDetailsStore = new EventDetailsStore(this.transport.concertDetailsTransport);
  }
}

export default RootStore;
