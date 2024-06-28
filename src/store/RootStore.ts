import ApplicationStore from "./ApplicationStore";
import ConcertStore from "./concertList/ConcertsStore";
import { Transport } from "./transport/rootTransport/Transport";

class RootStore {
  public readonly transport: Transport;

  public readonly concerts: ConcertStore;
  public readonly applicationStore: ApplicationStore;

  constructor() {
    this.transport = new Transport();

    this.concerts = new ConcertStore(this.transport.concertTransport);
    this.applicationStore = new ApplicationStore();
  }
}

export default RootStore;
