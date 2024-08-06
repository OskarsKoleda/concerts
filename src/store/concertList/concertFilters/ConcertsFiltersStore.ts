import { makeAutoObservable } from "mobx";

export class ConcertsFiltersStore {

    // public eventTitle: string;

    constructor() {
        makeAutoObservable(this);
        // this.eventTitle
    }
}