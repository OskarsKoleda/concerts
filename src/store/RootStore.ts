import { db } from '../firebaseConfig';
import ApplicationStore from './ApplicationStore';
import ConcertStore from './ConcertsStore';

class RootStore {
	concertStore: ConcertStore;
  applicationStore: ApplicationStore;

	constructor() {
		this.concertStore = new ConcertStore(db);
		this.applicationStore = new ApplicationStore();
	}
}

export default RootStore;
