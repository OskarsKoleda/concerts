import ApplicationStore from "./ApplicationStore";
import { ConcertDetailsStore } from "./concertDetails/ConcertDetailsStore";
import ConcertListStore from "./concertList/ConcertListStore";
import { Transport } from "./transport/rootTransport/Transport";

class RootStore {
  public readonly transport: Transport;

  public readonly concertListStore: ConcertListStore;
  public readonly concertDetailsStore: ConcertDetailsStore;
  public readonly applicationStore: ApplicationStore;

  constructor() {
    this.transport = new Transport();

    this.applicationStore = new ApplicationStore();
    this.concertListStore = new ConcertListStore(this.transport.concertListTransport);
    this.concertDetailsStore = new ConcertDetailsStore(this.transport.concertDetailsTransport);
  }
}

export default RootStore;
