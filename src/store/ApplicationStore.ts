import { makeAutoObservable } from "mobx";

class ApplicationStore {
  private concertsListView = true;

  constructor() {
    makeAutoObservable(this);
  }

  get listViewIsSelected(): boolean {
    return this.concertsListView;
  }

  toggleConcertsView = () => {
    this.concertsListView = !this.concertsListView;
  };
}

export default ApplicationStore;
