import ApplicationStore from "./ApplicationStore";
import UserStore from "./user/UserStore";

class RootStore {
  public readonly applicationStore: ApplicationStore;
  public readonly userStore: UserStore;

  constructor() {
    this.applicationStore = new ApplicationStore();
    this.userStore = new UserStore();
  }
}

export default RootStore;
