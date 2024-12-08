import { makeAutoObservable } from "mobx";

class ApplicationStore {
  private drawerOpen = false;
  private concertsListView = true;
  private activeMenuItem: string = "Home";

  constructor() {
    makeAutoObservable(this);
  }

  get drawerIsOpen(): boolean {
    return this.drawerOpen;
  }

  get listViewIsSelected(): boolean {
    return this.concertsListView;
  }

  get currentMenuItem(): string {
    return this.activeMenuItem;
  }

  toggleDrawer = () => {
    this.drawerOpen = !this.drawerOpen;
  };

  toggleConcertsView = () => {
    this.concertsListView = !this.concertsListView;
  };

  setActiveMenuItem = (menuItemLabel: string) => {
    this.activeMenuItem = menuItemLabel;
  };
}

export default ApplicationStore;
