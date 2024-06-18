import { makeAutoObservable } from 'mobx';

class ApplicationStore {
	drawerIsOpen = false;

	constructor() {
		makeAutoObservable(this);
	}

	toggleDrawer() {
		this.drawerIsOpen = !this.drawerIsOpen;
	}
}

export default ApplicationStore;
