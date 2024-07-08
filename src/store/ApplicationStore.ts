import { makeAutoObservable } from "mobx";

class ApplicationStore {
  private drawerOpen = false;
  private concertsListView = true;
  private selectedMenuItem = 0;

  constructor() {
    makeAutoObservable(this);
  }

  get drawerIsOpen(): boolean {
    return this.drawerOpen;
  }

  get listViewIsSelected(): boolean {
    return this.concertsListView;
  }

  get whatIsSelectedMenuItem(): number {
    return this.selectedMenuItem;
  }

  toggleDrawer = () => {
    this.drawerOpen = !this.drawerOpen;
  };

  toggleConcertsView = () => {
    this.concertsListView = !this.concertsListView;
  };

  selectMenuItem = (itemNumber: number) => {
    this.selectedMenuItem = itemNumber;
  };
}

export default ApplicationStore;
