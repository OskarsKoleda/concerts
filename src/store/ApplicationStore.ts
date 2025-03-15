import { makeAutoObservable } from "mobx";

class ApplicationStore {
  private tableView = false;
  private smallCardsView = false;

  constructor() {
    makeAutoObservable(this);
  }

  get tableViewIsSelected(): boolean {
    return this.tableView;
  }

  get smallCardsViewIsSelected(): boolean {
    return this.smallCardsView;
  }

  toggleEventsView = () => {
    this.tableView = !this.tableView;
  };

  toggleSmallCardsView = () => {
    this.smallCardsView = !this.smallCardsView;
  };
}

export default ApplicationStore;
