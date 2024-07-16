import ApplicationStore from "./ApplicationStore";
import ConcertStore from "./concertList/ConcertsStore";
import { Transport } from "./transport/rootTransport/Transport";

class RootStore {
  public readonly transport: Transport;

  public readonly concertsStore: ConcertStore;
  public readonly applicationStore: ApplicationStore;

  constructor() {
    this.transport = new Transport();

    this.concertsStore = new ConcertStore(this.transport.concertTransport);
    this.applicationStore = new ApplicationStore();
  }
}

export default RootStore;
