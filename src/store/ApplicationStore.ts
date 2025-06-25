import { makeAutoObservable } from "mobx";

class ApplicationStore {
  private tableView = false;

  constructor() {
    makeAutoObservable(this);
  }

  get tableViewIsSelected(): boolean {
    return this.tableView;
  }

  toggleEventsView = () => {
    this.tableView = !this.tableView;
  };
}

export default ApplicationStore;
