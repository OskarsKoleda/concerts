import ApplicationStore from "./ApplicationStore";

class RootStore {
  public readonly applicationStore: ApplicationStore;

  constructor() {
    this.applicationStore = new ApplicationStore();
  }
}

export default RootStore;
