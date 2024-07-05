import { makeAutoObservable } from "mobx";

class ApplicationStore {
  private drawerOpen = false;
  private concertsListView = true;

  constructor() {
    makeAutoObservable(this);
  }

  get drawerIsOpen(): boolean {
    return this.drawerOpen;
  }

  get listViewIsSelected(): boolean {
    return this.concertsListView;
  }

  toggleDrawer = () => {
    this.drawerOpen = !this.drawerOpen;
  };

  toggleConcertsView = () => {
    this.concertsListView = !this.concertsListView;
  };
}

export default ApplicationStore;
