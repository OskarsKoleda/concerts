import ApplicationStore from "./ApplicationStore/ApplicationStore";
import UserStore from "./UserStore/UserStore";

class RootStore {
  public readonly applicationStore: ApplicationStore;
  public readonly userStore: UserStore;

  constructor() {
    this.applicationStore = new ApplicationStore();
    this.userStore = new UserStore();
  }
}

export default RootStore;
