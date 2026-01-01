import { makeAutoObservable } from "mobx";

class ApplicationStore {
  private tableView = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isTableView(): boolean {
    return this.tableView;
  }

  toggleEventsView = () => {
    this.tableView = !this.tableView;
  };
}

export default ApplicationStore;
